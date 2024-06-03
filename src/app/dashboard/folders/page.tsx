import { ListFolders } from "@/modules/folders/ListFolders";
import React from "react";

export default function FoldersPage() {
  return (
    <section className="px-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold">Lista de carpetas</h2>
      </div>
      <ListFolders />
    </section>
  );
}
