import { createConnection, Connection, ConnectionOptions, getConnection } from 'typeorm';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';
import { Pool } from 'pg';

import {sleep} from '../src/libs/sleep';
import OrmConfigs from '../src/libs/typeorm/ormconfig';
/* eslint no-await-in-loop: 0 */

// Handles unstable/intermitten connection lost to DB
async function connectionGuard(connection: Connection): Promise<Connection> {
    // Access underlying pg driver
    if (connection.driver instanceof PostgresDriver) {
        const pool = connection.driver.master as Pool;

        // Add handler on pool error event
        pool.on('error', async err => {
            console.error(err, 'Connection pool erring out, Reconnecting...');
            await connection.close();
            while (!connection.isConnected) {
                try {
                    await connection.connect();
                    console.info('Reconnected DB');
                } catch (error) {
                    console.error(error, 'Reconnect Error');
                }

                if (!connection.isConnected) {
                    // Throttle retry
                    await sleep(500);
                }
            }
        });
    }

    return connection;
}

// 1. Wait for db to come online and connect
// 2. On connection instability, able to reconnect
// 3. The app should never die due to connection issue
export default async function connect(connectionName?: string): Promise<Connection[]> {
    let connections: Connection[];
    let isConnected: boolean[];

    console.info('Connecting to DB...');
    while (!isConnected) {
        try {
            connections = await Promise.all(
                OrmConfigs.map(async o => {
                    try {
                        return await createConnection(o as ConnectionOptions);
                    } catch (e) {
                        if (e instanceof AlreadyHasActiveConnectionError) {
                            return getConnection(o.name);
                        }
                        throw e;
                    }
                })
            );
            isConnected = connections.map(c => c.isConnected);
        } catch (error) {
            console.error(error, 'createConnection Error');
        }

        if (!isConnected) {
            // Throttle retry
            await sleep(500);
        }
    }

    console.info('Connected to DB');
    return Promise.all(connections.map(c => connectionGuard(c)));
}
