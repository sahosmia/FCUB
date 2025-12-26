
const PaymentStatusBadge = ({ status }) => {
    const statusStyles = {
        approved: 'bg-green-100 text-green-800 border-green-200',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
    };

    // Text Formate like [rejected => Rejected]
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
            {statusText}
        </span>
    );
};

export default PaymentStatusBadge;
