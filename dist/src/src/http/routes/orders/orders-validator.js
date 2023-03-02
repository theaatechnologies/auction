"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidator = void 0;
const inversify_1 = require("inversify");
const joi_1 = __importDefault(require("joi"));
const orders_repository_1 = require("src/repositories/orders-repository");
const route_validator_1 = require("src/http/routes/route-validator");
let OrdersValidator = class OrdersValidator extends route_validator_1.RouteValidator {
    validateAndMapGetSummaryQuery(data) {
        const schema = joi_1.default.object({
            filter: joi_1.default.object({
                store_channel_id: joi_1.default.object({
                    eq: joi_1.default.string().uuid().required(),
                }),
                "payment.status": joi_1.default.object({
                    eq: joi_1.default.string()
                        .valid(...Object.values(orders_repository_1.OrderPaymentStatus))
                        .required(),
                }),
            }),
        });
        return this.validate(schema, data);
    }
    validateGetCSVQuery(data) {
        const schema = joi_1.default.object({
            filter: joi_1.default.object({
                created_at: joi_1.default.object({
                    gte: joi_1.default.date().required(),
                    lte: joi_1.default.date().required(),
                }).required(),
                status: joi_1.default.object({
                    in: joi_1.default.array()
                        .items(joi_1.default.string().valid(...Object.values(orders_repository_1.OrderStatus)))
                        .single()
                        .required(),
                }),
                store_channel_id: joi_1.default.object({
                    eq: joi_1.default.string().uuid().required(),
                }),
            }).required(),
        });
        return this.validate(schema, data);
    }
    validateAndMapGetListQuery(data) {
        const schema = joi_1.default.object({
            filter: joi_1.default.object({
                status: joi_1.default.object({
                    in: joi_1.default.array()
                        .items(joi_1.default.string().valid(...Object.values(orders_repository_1.OrderStatus)))
                        .single()
                        .required(),
                }),
                order_number: joi_1.default.object({
                    in: joi_1.default.array().items(joi_1.default.number().integer()).single().required(),
                }),
                store_channel_id: joi_1.default.object({
                    eq: joi_1.default.string().uuid().required(),
                }),
                "payment.type": joi_1.default.object({
                    in: joi_1.default.array()
                        .items(joi_1.default.string().valid(...Object.values(orders_repository_1.OrderPaymentType)))
                        .single()
                        .required(),
                }),
                "customer.full_name": joi_1.default.object({
                    contains: joi_1.default.array().items(joi_1.default.string()).single().required(),
                }),
                created_at: joi_1.default.object({
                    gte: joi_1.default.date().when(joi_1.default.object({ lte: joi_1.default.date().exist() }), {
                        then: joi_1.default.date().greater(joi_1.default.ref("lte")),
                    }),
                    lte: joi_1.default.date().when(joi_1.default.object({ gte: joi_1.default.date().exist() }), {
                        then: joi_1.default.date().less(joi_1.default.ref("gte")),
                    }),
                }),
            }),
            sort: joi_1.default.string().valid(...Object.values(orders_repository_1.OrdersGetListSort)),
            page: joi_1.default.number().min(1).default(1),
            limit: joi_1.default.number().min(1).default(25),
        });
        return this.validate(schema, data);
    }
    validateAndMapCreateBody(data) {
        const defaultShipmentSchema = joi_1.default.object({
            sender: joi_1.default.object({
                first_name: joi_1.default.string(),
                last_name: joi_1.default.string(),
                address: joi_1.default.object({
                    address: joi_1.default.string(),
                    lat: joi_1.default.number(),
                    long: joi_1.default.number(),
                }),
            }),
            recipient: joi_1.default.object({
                first_name: joi_1.default.string(),
                last_name: joi_1.default.string(),
                address: joi_1.default.object({
                    address: joi_1.default.string(),
                    lat: joi_1.default.number(),
                    long: joi_1.default.number(),
                }),
                email: joi_1.default.string().email(),
                mobile_phone: joi_1.default.string().pattern(/^\+?[1-9]\d{1,14}$/),
            })
                .required()
                .or("mobile_phone", "email"),
            fee: joi_1.default.number().min(0).default(0),
        });
        const xenditPartnerShipmentSchema = joi_1.default.object({
            sender: joi_1.default.object({
                first_name: joi_1.default.string().required(),
                last_name: joi_1.default.string(),
                mobile_phone: joi_1.default.string()
                    .pattern(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/)
                    .required(),
                address: joi_1.default.object({
                    address: joi_1.default.string().required(),
                    area_id: joi_1.default.number().required(),
                    country_id: joi_1.default.number().required(),
                    notes: joi_1.default.string(),
                    lat: joi_1.default.number().required(),
                    long: joi_1.default.number().required(),
                }).required(),
            }).required(),
            recipient: joi_1.default.object({
                first_name: joi_1.default.string().required(),
                last_name: joi_1.default.string(),
                address: joi_1.default.object({
                    address: joi_1.default.string().required(),
                    area_id: joi_1.default.number().required(),
                    country_id: joi_1.default.number().required(),
                    notes: joi_1.default.string(),
                    lat: joi_1.default.number().required(),
                    long: joi_1.default.number().required(),
                }).required(),
                email: joi_1.default.string().email(),
                mobile_phone: joi_1.default.string()
                    .pattern(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/)
                    .required(),
            }).required(),
            courier: joi_1.default.object({
                rate_id: joi_1.default.number().required(),
            }).required(),
            package: joi_1.default.object({
                height: joi_1.default.number().required(),
                length: joi_1.default.number().required(),
                width: joi_1.default.number().required(),
                weight: joi_1.default.number().min(0.01).required(),
                type: joi_1.default.number()
                    .valid(...Object.values(orders_repository_1.OrderShipmentPackageType))
                    .required(),
            }).required(),
            payment_type: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderShipmentPaymentType))
                .required(),
        });
        const schema = joi_1.default.object({
            user_id: joi_1.default.string(),
            store_channel_id: joi_1.default.string().guid().required(),
            storefront_id: joi_1.default.string(),
            source: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderSource))
                .required(),
            //TODO: require only for MANUAL_PAYMENT, for PAYMENT_LINK is always UNPAID
            status: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderStatus))
                .required(),
            description: joi_1.default.string().max(3000),
            customer: joi_1.default.object({
                first_name: joi_1.default.string().required(),
                last_name: joi_1.default.string(),
                mobile_phone: joi_1.default.string().pattern(/^\+[1-9]\d{1,14}$/),
                address: joi_1.default.object({
                    address: joi_1.default.string(),
                }),
                email: joi_1.default.string().email(),
            }).or("mobile_phone", "email"),
            shipment: joi_1.default.object({
                method: joi_1.default.string()
                    .valid(...Object.values(orders_repository_1.OrderShipmentMethod))
                    .required(),
            }).when(joi_1.default.object({
                method: orders_repository_1.OrderShipmentMethod.XENDIT_PARTNER,
            }).unknown(), {
                then: xenditPartnerShipmentSchema,
                otherwise: defaultShipmentSchema,
            }),
            cart: joi_1.default.alternatives()
                .try(joi_1.default.array().items(joi_1.default.object({
                item_id: joi_1.default.string().guid().required(),
                item_variant_id: joi_1.default.string().guid().required(),
                quantity: joi_1.default.number().integer().min(1).required(),
            })))
                .try(joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().required(),
                price: joi_1.default.number().min(1000).required(),
                quantity: joi_1.default.number().integer().min(1).required(),
            })))
                .required(),
            payment: joi_1.default.object({
                type: joi_1.default.string()
                    .valid(...Object.values(orders_repository_1.OrderPaymentType))
                    .required(),
            })
                .when(joi_1.default.object({
                type: orders_repository_1.OrderPaymentType.MANUAL_PAYMENT,
            }).unknown(), {
                then: joi_1.default.object({
                    manual_payment: joi_1.default.object({
                        merchant_bank_name: joi_1.default.string(),
                        merchant_bank_account_name: joi_1.default.string(),
                        merchant_bank_account_no: joi_1.default.string(),
                        payment_method: joi_1.default.string()
                            .valid(...Object.values(orders_repository_1.OrderManualPaymentMethod))
                            .required(),
                    }).required(),
                }),
                otherwise: joi_1.default.object({
                    payment_link: joi_1.default.object({
                        invoice_success_redirect_url: joi_1.default.string(),
                        invoice_failure_redirect_url: joi_1.default.string(),
                    }),
                }),
            })
                .required(),
            discount: joi_1.default.number().min(0).default(0),
            currency: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderCurrency))
                .required(),
        }).when(joi_1.default.object({
            cart: joi_1.default.array().length(0),
        }).unknown(), {
            then: joi_1.default.object({
                total_cart_price: joi_1.default.number().min(0).required(),
            }),
        });
        return this.validate(schema, data);
    }
    validateUpdateStatusBody(data) {
        const schema = joi_1.default.object({
            status: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderStatus))
                .required(),
        });
        return this.validate(schema, data);
    }
};
OrdersValidator = __decorate([
    (0, inversify_1.injectable)()
], OrdersValidator);
exports.OrdersValidator = OrdersValidator;
//# sourceMappingURL=orders-validator.js.map