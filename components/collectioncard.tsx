// "use client";

// import { Collection, Task } from "@prisma/client";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "./ui/collapsible";
// import { Button } from "./ui/button";
// import { cn } from "@/lib/utils";
// import { CollectionColor, CollectionColors } from "@/lib/constants";
// import { useMemo, useState, useTransition } from "react";
// import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
// import { Progress } from "./ui/progress";
// import { Separator } from "./ui/separator";
// import { FaRegSquarePlus } from "react-icons/fa6";
// import { FaTrashAlt } from "react-icons/fa";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { deleteCollection } from "@/actions/collection";
// import { toast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import CreateTaskDialog from "./createtaskdialog";
// import TaskCard from "./taskcard";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// interface Props {
//   collection: Collection & { tasks: Task[] };
// }

// const Collectioncard = ({ collection }: Props) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLoading, startTransition] = useTransition();
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const tasks = collection.tasks;
//   const router = useRouter();

//   const removeCollection = async () => {
//     try {
//       await deleteCollection(collection.id);
//       console.log("deleted", collection.id);
//       router.refresh();
//       toast({
//         title: "success",
//         description: "collection deleted successfully",
//       });
//     } catch {
//       toast({
//         title: "error",
//         description: "collection deletion problem",
//         variant: "destructive",
//       });
//     }
//   };

//   const tasksDone = useMemo(() => {
//     return collection.tasks.filter((task) => task.done).length;
//   }, [collection.tasks]);

//   const totalTasks = collection.tasks.length;

//   const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

//   return (
//     <div className="w-full">
//       <CreateTaskDialog
//         open={showCreateModal}
//         setOpen={setShowCreateModal}
//         collection={collection}
//       />
//       <Collapsible open={isOpen} onOpenChange={setIsOpen}>
//         <CollapsibleTrigger asChild>
//           <Button
//             variant="ghost"
//             className={cn(
//               "flex w-full justify-between p-6",
//               CollectionColors[collection.color as CollectionColor]
//             )}
//           >
//             <span className="text-white font-bold">{collection.name}</span>
//             <div className="flex items-center gap-2">
//               <div className="h-6 w-6">
//                 <CircularProgressbar
//                   value={progress}
//                   text={`${Math.round(progress)}%`}
//                   styles={buildStyles({
//                     textSize: "36px",
//                     pathColor: "white",
//                     textColor: "white",
//                     trailColor: "rgba(255, 255, 255, 0.3)",
//                   })}
//                 />
//               </div>
//               {!isOpen && <CiCircleChevDown className="h-5 w-5" />}
//               {isOpen && <CiCircleChevUp className="h-5 w-5" />}
//             </div>
//           </Button>
//         </CollapsibleTrigger>
//         <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
//           {tasks.length === 0 && (
//             <div className="p-4 justify-center">No tasks yet</div>
//           )}
//           {tasks.length > 0 && (
//             <>
//               <div className="flex items-center gap-4 px-4 pt-2">
//                 <div className="flex-1">
//                   <Progress
//                     className="rounded-none bg-red-500 dark:bg-red-600 h-[12px] my-[1px]"
//                     value={progress}
//                   />
//                 </div>
//                 <div className="text-xs text-neutral-500 dark:text-neutral-400">
//                   {tasksDone} of {totalTasks} tasks completed
//                 </div>
//               </div>
//               <div className="flex">
//                 {/* Tasks list (left side) */}
//                 <div className="flex-1">
//                   {tasks.map((task) => (
//                     <TaskCard key={task.id} task={task} />
//                   ))}
//                 </div>

//                 {/* Big circular progress (right side) */}
//                 <div className="w-48 h-48 p-4 flex flex-col items-center justify-center">
//                   <CircularProgressbar
//                     value={progress}
//                     text={`${Math.round(progress)}%`}
//                     styles={buildStyles({
//                       textSize: "16px",
//                       pathColor:
//                         CollectionColors[collection.color as CollectionColor],
//                       textColor:
//                         CollectionColors[collection.color as CollectionColor],
//                       trailColor: "rgba(0, 0, 0, 0.1)",
//                       pathTransitionDuration: 0.5,
//                     })}
//                   />
//                   <div className="mt-2 text-sm text-center text-neutral-500 dark:text-neutral-400">
//                     <div className="font-medium">Progress</div>
//                     <div>
//                       {tasksDone}/{totalTasks} tasks
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//           <Separator />
//           <footer className="h-[40px] px-4 text-xs text-neutral-500 flex justify-between items-center">
//             <p>Created At {collection.createdAt.toDateString()}</p>
//             {isLoading && <div>Deleting...</div>}
//             {!isLoading && (
//               <div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setShowCreateModal(true)}
//                 >
//                   <FaRegSquarePlus />
//                 </Button>
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <FaTrashAlt />
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>
//                         Are you absolutely sure?
//                       </AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This action cannot be undone. This will permanently
//                         delete your task and remove your data from our servers.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => startTransition(removeCollection)}
//                       >
//                         Continue
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             )}
//           </footer>
//         </CollapsibleContent>
//       </Collapsible>
//     </div>
//   );
// };
// export default Collectioncard;

"use client";

import { Collection, Task } from "@prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { useMemo, useState, useTransition } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./createtaskdialog";
import TaskCard from "./taskcard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  collection: Collection & { tasks: Task[] };
}

const Collectioncard = ({ collection }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, startTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const tasks = collection.tasks;
  const router = useRouter();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      router.refresh();
      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete collection",
        variant: "destructive",
      });
    }
  };

  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  const totalTasks = collection.tasks.length;
  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;
  const roundedProgress = Math.round(progress);

  return (
    <div className="w-full">
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />

      {/* Mobile Percentage Display (hidden on desktop)
      <div className="md:hidden flex justify-center py-2">
        <div
          className={cn(
            "text-3xl font-bold py-2 px-6 rounded-full",
            CollectionColors[collection.color as CollectionColor],
            "text-white"
          )}
        >
          {roundedProgress}%
        </div>
      </div> */}

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-between p-6",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {/* Mobile Percentage Display (hidden on desktop) */}
            <div className="md:hidden flex justify-center py-2">
              <div
                className={cn(
                  "text-3xl font-bold py-2 px-6 rounded-full",
                  CollectionColors[collection.color as CollectionColor],
                  "text-white"
                )}
              >
                {roundedProgress}%
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Desktop Circular Progress (hidden on mobile) */}
              <div className="hidden md:block h-6 w-6">
                <CircularProgressbar
                  value={progress}
                  text={`${roundedProgress}%`}
                  styles={buildStyles({
                    textSize: "36px",
                    pathColor: "white",
                    textColor: "white",
                    trailColor: "rgba(255, 255, 255, 0.3)",
                  })}
                />
              </div>
              {!isOpen ? (
                <CiCircleChevDown className="h-5 w-5" />
              ) : (
                <CiCircleChevUp className="h-5 w-5" />
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 ? (
            <div className="p-4 text-center">No tasks yet</div>
          ) : (
            <>
              <div className="flex items-center gap-4 px-4 pt-2">
                <div className="flex-1">
                  <Progress
                    className="rounded-none bg-red-500 dark:bg-red-600 h-[12px] my-[1px]"
                    value={progress}
                  />
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {tasksDone} of {totalTasks} tasks completed
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
                {/* Desktop Circular Progress (hidden on mobile) */}
                <div className="hidden md:flex w-48 h-48 p-4 flex-col items-center justify-center">
                  <CircularProgressbar
                    value={progress}
                    text={`${roundedProgress}%`}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor:
                        CollectionColors[collection.color as CollectionColor],
                      textColor:
                        CollectionColors[collection.color as CollectionColor],
                      trailColor: "rgba(0, 0, 0, 0.1)",
                      pathTransitionDuration: 0.5,
                    })}
                  />
                  <div className="mt-2 text-sm text-center text-neutral-500 dark:text-neutral-400">
                    <div className="font-medium">Progress</div>
                    <div>
                      {tasksDone}/{totalTasks} tasks
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 text-xs text-neutral-500 flex justify-between items-center">
            <p>Created {new Date(collection.createdAt).toLocaleDateString()}</p>
            {!isLoading && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(true)}
                  className="hover:bg-gray-200/30 dark:hover:bg-gray-700/50"
                >
                  <FaRegSquarePlus />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-200/30 dark:hover:bg-gray-700/50"
                    >
                      <FaTrashAlt />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete this collection?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the collection and all its
                        tasks.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => startTransition(removeCollection)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Collectioncard;
