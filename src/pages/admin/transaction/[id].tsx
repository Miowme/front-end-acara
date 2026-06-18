import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransactionAdmin from "@/components/views/Admin/DetailTransaction";

const DetailTransactionAdminPage = () => {
    return (
        <DashboardLayout 
            title="Detail Transaction" 
            description="Information for specific transaction" 
            type="admin"
        >
            <DetailTransactionAdmin />
        </DashboardLayout>
    );
};

export default DetailTransactionAdminPage;