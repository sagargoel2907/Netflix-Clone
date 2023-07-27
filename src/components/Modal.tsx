import { Dialog, Transition } from "@headlessui/react";
import React, { useRef } from "react";
import { Fragment } from "react";
import { Position } from "../common/types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactElement;
  position: Position;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  position,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              afterEnter={() => {
                panelRef.current?.addEventListener("mouseleave", onClose);
              }}
              afterLeave={() => {
                panelRef.current?.removeEventListener("mouseleave", onClose);
              }}
            >
              <Dialog.Panel
                style={{
                  position: "fixed",
                  ...position,
                  border: "0.5px solid gray",
                }}
                ref={panelRef}
                className="transform overflow-hidden bg-dark  rounded-2xl text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                ></Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
