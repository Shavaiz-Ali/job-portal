import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Alert({ openDialog, setOpenDialog, handleDeleteJob, loader }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger open={openDialog} onOpenChange={setOpenDialog}>
        <Button className=" dark:bg-[#fffa27] bg-red-600  flex h-11 items-center justify-center px-5 text-white hover:bg-red-400">
          Delete Job
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDeleteJob();
              !loader && setOpenDialog(false);
            }}
          >
            {loader ? "Loading..." : "Delete Job"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
