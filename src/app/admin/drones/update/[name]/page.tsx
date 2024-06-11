"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { createProduct } from "@/lib/action/products.actions";
import { useParams, useRouter } from "next/navigation";
import { useCreateDroneMutation, useGetDroneQuery, useUpdateDroneMutation } from '../../../../../../generated-types';

const Radio = ({ label, value, onChange, checked, name }) => (
  <label className="inline-flex items-center space-x-2">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio h-4 w-4 text-blue-600"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

const RadioGroup = ({ children, value, onChange }) => (
  <div>
    {React.Children.map(children, child => 
      React.cloneElement(child, {
        checked: child.props.value === value,
        onChange: onChange,
      })
    )}
  </div>
);


type FormValues = {
  description: string;
  imageUrl: string;
  name: string;
  price: string;
  stock: string;
  subtitle: string;
  paymentMethod: string;
  interest?: string;
};

const schema = z.object({
  name: z.string().min(1, "El nombre del dron es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  price: z.string(),
  stock: z.string(),
  subtitle: z.string(),
  imageUrl: z.string(),
  paymentMethod: z.string(),
  interest: z.string().optional(),
});

function Page() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleBackClick = () => router.back();
  const {mutate} = useUpdateDroneMutation({},{})
  const params = useParams<{name: string}>();
  const {data, isFetched } = useGetDroneQuery({}, { droneName: "Drone Pele"})

  const create = async (data: FormValues) => {
    try {
      mutate({
        UpdateDroneInput: {
          id: 1,
          imageUrl: data.imageUrl,
          name: data.name,
          description: data.description,
          price: parseInt(data.price),
          stock: parseInt(data.stock),
          subtitle: data.subtitle
        }
      })
      router.back();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('data', data);
    create(data);
  };

  return (
    <FormProvider {...form}>
      <div>
        <Button onClick={handleBackClick} variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-1/2 flex flex-col gap-y-5">
          <div>
            <h1 className="font-semibold text-2xl my-10">Editar Dron</h1>
          </div>
          {isFetched && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-10">
            <FormField
              control={form.control}
              name="name"
              defaultValue={data?.getDrone.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es su nombre público.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              defaultValue={data?.getDrone.subtitle}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitulo</FormLabel>
                  <FormControl>
                    <Input placeholder="subtitulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              defaultValue={data?.getDrone.description}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              defaultValue={data?.getDrone.imageUrl}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Input placeholder="URL de la imagen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              defaultValue={data?.getDrone?.price ? data.getDrone.price.toString() : ''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder="Precio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="Stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pago</FormLabel>
                  <RadioGroup {...field}>
                    <Radio label="Efectivo" value="cash" name="paymentMethod"/>
                    <Radio label="Crédito" value="credit" name="paymentMethod"/>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            { form.watch("paymentMethod") === "credit" && (
              <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tasa de Interés</FormLabel>
                  <Input type="text" placeholder="Ingrese la tasa de interés" {...field} />
                </FormItem>
              )}
            />

            )}
            <Button type="submit">
              Crear
            </Button>
          </form>
          )}
        </div>
      </div>
    </FormProvider>
  );
}

export default Page;
