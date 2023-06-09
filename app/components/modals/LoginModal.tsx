"use client";
import { useLoginModal, useRegisterModal } from "@/app/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

type Props = {};

const LoginModal = (props: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        errors={errors}
        disabled={isLoading}
        register={register}
        required
      />
      <Input
        id="password"
        label="Password"
        errors={errors}
        disabled={isLoading}
        register={register}
        required
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className={" flex flex-col gap-4 mt-3"}>
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue with Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
      />
      <div className={"text-neutral-500 text-center mt-4 font-light"}>
        <div className={"flex flex-row items-center justify-center gap-2"}>
          <div>Do not have an account?</div>
          <div
            className={"text-neutral-800 cursor-pointer hover:underline"}
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
          >
            Register an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
