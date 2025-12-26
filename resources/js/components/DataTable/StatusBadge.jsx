const StatusBadge = ({ active }) => (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {active ? 'Active' : 'Inactive'}
    </span>
);

export default StatusBadge;
