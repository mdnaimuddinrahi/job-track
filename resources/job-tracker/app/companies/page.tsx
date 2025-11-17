import { api } from "@/lib/api";

export default async function CompaniesPage() {
 const { data: data } = await api("/companies");
  console.log("data", data.companies);


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Companies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.companies.map((company: any) => (
          <div
            key={company.id}
            className="p-4 bg-white rounded-xl shadow"
          >
            <h2 className="font-semibold">{company.name}</h2>
            <p>{company.email}</p>
            <p className="text-blue-500">{company.website}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
