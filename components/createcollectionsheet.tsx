import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/createCollection";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CollectionCollor, CollectionCollors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCollectionSheet = ({ open, onOpenChange }: Props) => {
  const form = useForm<createCollectionSchemaType>({
    defaultValues: { name: "", color: "" },
    resolver: zodResolver(createCollectionSchema),
  });

  const onSubmit = (data: createCollectionSchemaType) => {
    console.log("submitted", data);
  };

  const onOpenChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Task</SheetTitle>
          <SheetDescription>Add Content Here</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          `w-full h-8`,
                          CollectionCollors[field.value as CollectionCollor]
                        )}
                      >
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem> */}

                        {Object.keys(CollectionCollors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full rounded-md`,
                              CollectionCollors[color as CollectionCollor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className={cn(
              form.watch("color") &&
                CollectionCollors[form.getValues("color") as CollectionCollor]
            )}
          >
            Submit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CreateCollectionSheet;
