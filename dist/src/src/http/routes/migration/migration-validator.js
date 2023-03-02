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
exports.MigrationValidator = void 0;
const inversify_1 = require("inversify");
const joi_1 = __importDefault(require("joi"));
const orders_repository_1 = require("src/repositories/orders-repository");
const route_validator_1 = require("src/http/routes/route-validator");
let MigrationValidator = class MigrationValidator extends route_validator_1.RouteValidator {
    validateAndMapCreateOrderBody(data) {
        const schema = joi_1.default.object({
            id: joi_1.default.string().required(),
            user_id: joi_1.default.string(),
            store_channel_id: joi_1.default.string().guid().required(),
            storefront_id: joi_1.default.string(),
            source: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderSource))
                .required(),
            status: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderStatus))
                .required(),
            description: joi_1.default.string().max(3000),
            customer: joi_1.default.object({
                id: joi_1.default.string().required(),
                first_name: joi_1.default.string().required(),
                last_name: joi_1.default.string(),
                mobile_phone: joi_1.default.string().pattern(/^\+?[1-9]\d{1,14}$/),
                address: joi_1.default.object({
                    address: joi_1.default.string(),
                    country: joi_1.default.string(),
                    province: joi_1.default.string(),
                    city: joi_1.default.string(),
                    suburb: joi_1.default.string(),
                    area: joi_1.default.string(),
                    zip_code: joi_1.default.string().regex(/^\d+$/).min(2),
                }),
                email: joi_1.default.string().email(),
            }).or("mobile_phone", "email"),
            shipment: joi_1.default.object({
                sender: joi_1.default.object({
                    first_name: joi_1.default.string(),
                    last_name: joi_1.default.string(),
                    address: joi_1.default.object({
                        address: joi_1.default.string(),
                        country: joi_1.default.string(),
                        province: joi_1.default.string(),
                        city: joi_1.default.string(),
                        suburb: joi_1.default.string(),
                        area: joi_1.default.string(),
                        lat: joi_1.default.number(),
                        long: joi_1.default.number(),
                        zip_code: joi_1.default.string().regex(/^\d+$/).min(2),
                    }),
                }),
                recipient: joi_1.default.object({
                    first_name: joi_1.default.string(),
                    last_name: joi_1.default.string(),
                    address: joi_1.default.object({
                        address: joi_1.default.string(),
                        country: joi_1.default.string(),
                        province: joi_1.default.string(),
                        city: joi_1.default.string(),
                        suburb: joi_1.default.string(),
                        area: joi_1.default.string(),
                        lat: joi_1.default.number(),
                        long: joi_1.default.number(),
                        zip_code: joi_1.default.string().regex(/^\d+$/).min(2),
                    }),
                    email: joi_1.default.string().email(),
                    mobile_phone: joi_1.default.string().pattern(/^\+?[1-9]\d{1,14}$/),
                })
                    .required()
                    .or("mobile_phone", "email"),
                fee: joi_1.default.number().min(0).default(0),
                method: joi_1.default.string()
                    .valid(...Object.values(orders_repository_1.OrderShipmentMethod))
                    .required(),
            }),
            cart: joi_1.default.array()
                .items(joi_1.default.object({
                item_id: joi_1.default.string().guid().required(),
                item_variant_id: joi_1.default.string().guid().required(),
                name: joi_1.default.string(),
                item_name: joi_1.default.string(),
                item_variant_name: joi_1.default.string(),
                quantity: joi_1.default.number().integer().min(0).required(),
                price: joi_1.default.number().min(0).required(),
                image_url: joi_1.default.string(),
            })
                .or("name", "item_name")
                .required())
                .required(),
            payment: joi_1.default.object({
                type: joi_1.default.string()
                    .valid(...Object.values(orders_repository_1.OrderPaymentType))
                    .required(),
                status: joi_1.default.custom((value) => {
                    const status = [orders_repository_1.OrderStatus.UNPAID, orders_repository_1.OrderStatus.CANCELLED].includes(data.status)
                        ? orders_repository_1.OrderPaymentStatus.UNPAID
                        : orders_repository_1.OrderPaymentStatus.PAID;
                    const { error } = joi_1.default.string()
                        .valid(status)
                        .required()
                        .validate(value);
                    if (error)
                        throw error;
                    return value;
                }).required(),
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
                        invoice_id: joi_1.default.string().required(),
                        invoice_url: joi_1.default.string().required(),
                        invoice_short_url: joi_1.default.string(),
                        expires_at: joi_1.default.date().required(),
                        paid_at: joi_1.default.date(),
                        payment_channel: joi_1.default.string(),
                        payment_method: joi_1.default.string(),
                        status: joi_1.default.custom((value) => {
                            let status;
                            switch (data.status) {
                                case orders_repository_1.OrderStatus.CANCELLED:
                                    status = orders_repository_1.OrderPaymentLinkStatus.EXPIRED;
                                    break;
                                case orders_repository_1.OrderStatus.UNPAID:
                                    status = orders_repository_1.OrderPaymentLinkStatus.PENDING;
                                    break;
                                default:
                                    status = orders_repository_1.OrderPaymentLinkStatus.PAID;
                                    break;
                            }
                            const { error } = joi_1.default.string()
                                .valid(status)
                                .required()
                                .validate(value);
                            if (error)
                                throw error;
                            return value;
                        }).required(),
                    }).required(),
                }),
            })
                .required(),
            discount: joi_1.default.number().min(0).default(0),
            currency: joi_1.default.string()
                .valid(...Object.values(orders_repository_1.OrderCurrency))
                .required(),
            total_price: joi_1.default.number().min(0).required(),
            total_cart_price: joi_1.default.number().min(0).required(),
            created_at: joi_1.default.date().required(),
            deleted_at: joi_1.default.date(),
        });
        return this.validate(schema, data);
    }
};
MigrationValidator = __decorate([
    (0, inversify_1.injectable)()
], MigrationValidator);
exports.MigrationValidator = MigrationValidator;
//# sourceMappingURL=migration-validator.js.map