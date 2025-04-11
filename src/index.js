"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
// ✅ ดึงข้อมูลจาก TGO Registry ทีละหน้า
function fetchPage(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.registry.tgo.or.th/api/v1/home?page=${page}&limit=${limit}&sort=-1,-1&sort_by=registration_date,project_id`;
        const res = yield axios_1.default.get(url);
        return res.data.data;
    });
}
// ✅ Main function
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const totalPages = 5;
        const limit = 100;
        const allCertificates = [];
        let page = 1;
        while (true) {
            const items = yield fetchPage(page, limit);
            console.log(`📦 Fetching page ${page}`);
            if (items.length === 0)
                break; // 👉 ไม่มีข้อมูลแล้ว หยุดลูป
            yield delay(300); // หน่วง 300ms ก่อนจะยิงหน้าถัดไป
            allCertificates.push(...items);
            console.log(`✅ Loaded page ${page}, total so far: ${allCertificates.length}`);
            page++;
        }
        console.log(`📝 Writing ${allCertificates.length} records to JSON file...`);
        fs.writeFileSync('certificates.json', JSON.stringify(allCertificates, null, 2), 'utf-8');
        console.log('✅ Done! File: certificates.json');
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
run().catch((err) => {
    console.error('❌ Error:', err);
});
