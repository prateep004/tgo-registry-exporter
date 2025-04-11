
// ✅ รูปแบบของไฟล์แนบแต่ละรายการ
export interface ICertifiedFile {
    _id: string;
    created_at: string;
    src: string;
    name: string;
}

// ✅ รูปแบบของข้อมูลหลักแต่ละรายการ
export interface ICertificateData {
    batch_number: number;
    day_batch_number: number;
    status: number;
    issued_date: string;
    buffer_amount: number | null;
    from_cert_id: string | null;
    _id: string;
    start_date: string;
    end_date: string;
    amount: number;
    certified_files?: ICertifiedFile[];
    block_start: number;
    block_end: number;
}

// ✅ ข้อมูลที่เราจะเขียนลง CSV (เลือก field สำคัญ + แปลง array เป็น string)
export interface ICsvExportRow {
    batch_number: number;
    issued_date: string;
    start_date: string;
    end_date: string;
    amount: number;
    block_start: number;
    block_end: number;
    file_names: string;
}

