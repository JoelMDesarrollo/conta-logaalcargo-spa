"use client";
import { useQuery } from "@tanstack/react-query";
import { IResponseConceptFolder, IResponseFolder } from "../interface/folders";
import axios from "axios";
import { token } from "@/modules/shared/constants/token";
import { FormConceptFolder } from "./FormConceptFolder";

interface Props {
  numRef: string;
  close?: boolean;
}
export const ListConceptExpense = ({ numRef, close = false }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ConceptExpense", numRef],
    queryFn: async (): Promise<{ data: IResponseConceptFolder[] }> =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ConceptExpense/carpeta/${numRef}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    staleTime: 1000 * 30 * 10,
  });

  const {
    data: dataFolder,
    isLoading: isLoadingFolder,
    error: errorFolder,
  } = useQuery({
    queryKey: ["ProdecureDetail", numRef],
    queryFn: async (): Promise<{ data: IResponseFolder }> =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_TRAZO_URL}/Procedure/numRef/${numRef}/Detail`,
        { headers: { "Content-Type": "application/json" } }
      ),
    staleTime: 1000 * 30 * 10,
  });

  if (isLoading || isLoadingFolder) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (errorFolder) return "An error has occurred: " + errorFolder.message;

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-2">
        <h4>Carpeta: {dataFolder?.data.numRef}</h4>
        <h4>DIM: {dataFolder?.data.dim}</h4>
        <h4>Cliente: {dataFolder?.data.clienteNombre}</h4>
        <h4>Mercadería: {dataFolder?.data.mercaderia}</h4>
      </div>

      {data ? <FormConceptFolder data={data.data} numRef={numRef} /> : null}
    </div>
  );
};