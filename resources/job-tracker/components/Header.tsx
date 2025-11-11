'use client'

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-md hover:bg-slate-100">☰</button>
                    <h2 className="text-lg font-medium">Dashboard</h2>
                </div>

                <div className="flex items-center gap-4">
                    <input placeholder="Search..." className="border rounded px-3 py-1" />
                <div className="rounded-full bg-slate-100 w-9 h-9 flex items-center justify-center">R</div>
            </div>
        </header>
    )
}