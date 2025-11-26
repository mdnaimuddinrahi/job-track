import InputMultiSelectCheckbox from "./Form/InputMultiSelectCheckbox";

export default function ListHeading({ title }: { title: string }) {
  return (
    <div className="p-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* Global Search */}
        <InputMultiSelectCheckbox />
        
     </div>
  );
}   