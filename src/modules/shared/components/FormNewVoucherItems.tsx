"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import Select, { SingleValue } from "react-select";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Account } from "@/modules/account/types/account";
import { VoucherItem } from "../types/sharedTypes";

type FormNewVoucherItemsProps = {
  voucherItems: VoucherItem[];
  setVoucherItems: Dispatch<SetStateAction<VoucherItem[]>>;
  accountData: Account[];
};
export default function FormNewVoucherItems({
  accountData,
  voucherItems,
  setVoucherItems,
}: FormNewVoucherItemsProps) {
  function onChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target;

    let listVoucherItem = voucherItems;
    
    if (name === 'debitBs' || name === 'assetBs') {
      listVoucherItem[index] = {
        ...listVoucherItem[index],
        [name]: parseFloat(value) || 0,
      };
    } else {
      listVoucherItem[index] = {
        ...listVoucherItem[index],
        [name]: value,
      };
    }
    setVoucherItems([...listVoucherItem]);
  }

  function onSelectChange(option: SingleValue<{ value: string; label: string }> | null, index: number) {
    let listVoucherItem = [...voucherItems];
    listVoucherItem[index] = {
      ...listVoucherItem[index],
      accountId: option ? option.value : "",
    };
    setVoucherItems(listVoucherItem);
  }

  function removeVoucherItem(index: number) {
    const updateVoucherItems = voucherItems.filter((_, i) => i != index);
    setVoucherItems([...updateVoucherItems]);
  }

  const accountOptions = accountData.map((item) => ({
    value: item.id.toString(),
    label: `${item.code} - ${item.description}`,
    //...item
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Asiento contable</h2>
        <Button
          type="button"
          onClick={() =>
            setVoucherItems((a) => [
              ...a,
              {
                debitBs: 0,
                debitSus: 0,
                assetBs: 0,
                assetSus: 0,
                gloss: "",
                accountId: "",
                voucherId: "",
              },
            ])
          }
        >
          <span className="mr-2">Adicionar Item</span>
          <Plus size={18} />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cuenta</TableHead>
            <TableHead>Debe Bs.</TableHead>
            <TableHead>Haber Bs.</TableHead>
            <TableHead>Glosa</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voucherItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="">
                <Select
                  isSearchable={true}
                  options={accountOptions}
                  value={accountOptions.find(option => option.value === item.accountId)}
                  onChange={(option) => onSelectChange(option as SingleValue<{ value: string; label: string }>, index)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="debitBs"
                  onChange={(e) => onChange(e, index)}
                  value={item.debitBs}
                  defaultValue={0}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="assetBs"
                  onChange={(e) => onChange(e, index)}
                  value={item.assetBs}
                  defaultValue={0}
                  min={0}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="gloss"
                  onChange={(e) => onChange(e, index)}
                  value={item.gloss}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  type="button"
                  onClick={() => removeVoucherItem(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}