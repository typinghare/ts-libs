"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratorGenerator = exports.zone = void 0;
const ts_reflect_1 = require("@typinghare/ts-reflect");
exports.zone = ts_reflect_1.Zone.new('json-equivalence');
exports.decoratorGenerator = new ts_reflect_1.DecoratorGenerator(exports.zone);
