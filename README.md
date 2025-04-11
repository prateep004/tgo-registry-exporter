# tgo-registry-exporter
Extracts project data from the TGO registry API and exports it to CSV format. Built with TypeScript.

# 🌱 TGO Registry Exporter

A TypeScript-powered tool for fetching paginated project data from the [TGO Registry](https://registry.tgo.or.th/) API and exporting it to a structured CSV file — perfect for analysis, reporting, or integration into other systems.

---

## 🚀 Features

- 📡 Pulls project data from a paginated API
- 📦 Outputs clean CSV files with project metadata
- 🔁 Automatically loops through all pages until complete
- ⚙️ Built with TypeScript, using `axios` and `csv-writer`

---

## 📦 Installation

```bash
git clone https://github.com/your-username/tgo-registry-exporter.git
cd tgo-registry-exporter
npm install

