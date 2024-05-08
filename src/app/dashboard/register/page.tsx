"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Link from "next/link";


interface registerFormInputs {
  username: string;
  password: string;
}



function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  const registerSchema = z.object({
    username: z.string().min(4, {
      message: "Debe tener mínimo 4 caracteres",
    }),
    password: z.string().min(4, {
        message: "Debe tener mínimo 4 caracteres",
      }),
    email: z.string(),
    name: z.string(),
    ci: z.string(),
    fatherLastName: z.string(),
    motherLastName: z.string(),
    appCode: z.string(),

  });



  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/register`,
        {
          username: values.username,
          password: values.password,
          email: values.email,
          name: values.name,
          ci: values.ci,
          fatherLastName: values.fatherLastName,
          motherLastName: values.motherLastName,
          appCode: values.appCode
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        setSuccessMessage("Éxito.");
        setSuccessDialogOpen(true);
        reset(); // Limpiar los campos del formulario
      } else {
        setErrorMessage("Error durante la creación del usuario");
        setDialogOpen(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data || "Error desconocido");
      } else {
        setErrorMessage(String(error));
      }
      setDialogOpen(true);
    }
  }


  const closeDialog = () => setDialogOpen(false);
  const closeSuccessDialog = () => setSuccessDialogOpen(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      ci: "",
      fatherLastName: "",
      motherLastName: "",
      appCode: "",
    },
  });
  const { reset } = registerForm;

  return (
    <div className="flex  items-center justify-center  ">
      <div className="flex flex-col rounded-xl border border-primary-500 p-3 ">
      <FormProvider {...registerForm}>
        <div className="mx-10 mt-10 flex h-full flex-col items-center justify-center p-2 ">
          <h1 className="mb-4 font-semibold ">REGISTRATE</h1>
          <Form {...registerForm}>
            
            <form onSubmit={registerForm.handleSubmit(onSubmit)}>
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="fatherLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Paterno</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="motherLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Materno</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="ci"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CI</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-5 flex flex-col items-center space-y-4">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 font-bold py-5 px-8 rounded shadow" >
                  Registrar
                </Button>
                {/* <Link href="/auth/login" passHref>
                  <button
                    type="button"
                    className="bg-green-800 hover:bg-green-900 text-black font-bold py-2 px-4 rounded shadow"
                  >
                    Iniciar Sesión
                  </button>
                </Link> */}
              </div>
            </form>

          </Form>
        </div>
        </FormProvider>
      </div>

      <AlertDialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-black border border-blue-500 p-4 shadow-lg rounded-lg">
          <AlertDialog.Title className="text-lg font-bold text">
            Error
          </AlertDialog.Title>
          <AlertDialog.Description>{errorMessage}</AlertDialog.Description>
          <div className="flex justify-end mt-4">
            <AlertDialog.Action asChild>
              <Button onClick={closeDialog}>Cerrar</Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={isSuccessDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 border border-blue-500 p-4 shadow-lg rounded-lg">
          <AlertDialog.Title className="text-lg font-bold">Éxito</AlertDialog.Title>
          <AlertDialog.Description>{successMessage}</AlertDialog.Description>
          <div className="flex justify-end mt-4">
            <AlertDialog.Action asChild>
              <Button onClick={closeSuccessDialog}>Cerrar</Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>


    </div>
  );
}

export default Register;