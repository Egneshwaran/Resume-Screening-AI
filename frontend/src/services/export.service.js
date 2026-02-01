import axios from 'axios';

const API_URL = '/api/export/';

class ExportService {
    async exportPdf(jobId = null) {
        const response = await axios.get(API_URL + 'pdf', {
            params: { jobId },
            responseType: 'blob',
        });
        this._downloadFile(response.data, 'screening_results.pdf');
    }

    async exportExcel(jobId = null) {
        const response = await axios.get(API_URL + 'excel', {
            params: { jobId },
            responseType: 'blob',
        });
        this._downloadFile(response.data, 'screening_results.xlsx');
    }

    _downloadFile(data, filename) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
}

export default new ExportService();
