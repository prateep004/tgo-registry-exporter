import axios from 'axios';
import * as fs from 'fs';
import { ICertificateData } from './type/index.type'


// ✅ ดึงข้อมูลจาก TGO Registry ทีละหน้า
async function fetchPage(page: number, limit: number): Promise<ICertificateData[]> {
    const url = `https://api.registry.tgo.or.th/api/v1/home?page=${page}&limit=${limit}&sort=-1,-1&sort_by=registration_date,project_id`;
    const res = await axios.get<{ data: ICertificateData[] }>(url);
    return res.data.data;
}

// ✅ Main function
async function run() {
    const totalPages = 5;
    const limit = 100;
    const allCertificates: ICertificateData[] = [];

    let page = 1;
    while (true) {
        const items = await fetchPage(page, limit);
        console.log(`📦 Fetching page ${page}`);
        if (items.length === 0) break; // 👉 ไม่มีข้อมูลแล้ว หยุดลูป
        await delay(300); // หน่วง 300ms ก่อนจะยิงหน้าถัดไป
        allCertificates.push(...items);
        console.log(`✅ Loaded page ${page}, total so far: ${allCertificates.length}`);
        page++;
    }
    console.log(`📝 Writing ${allCertificates.length} records to JSON file...`);

    fs.writeFileSync('certificates.json', JSON.stringify(allCertificates, null, 2), 'utf-8');

    console.log('✅ Done! File: certificates.json');
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

run().catch((err) => {
    console.error('❌ Error:', err);
});

