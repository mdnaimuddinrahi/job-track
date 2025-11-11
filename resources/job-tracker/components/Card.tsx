export default function Card({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="mt-2 text-2xl font-semibold">{value}</div>
        </div>
    )
}