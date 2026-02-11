"use client";

import { useAuthModal } from "@/store/useAuthModalStore";
import Modal from "./Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
  const { isRegisterOpen, closeRegister, openLogin } = useAuthModal();

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeRegister} title="Register">
      {/* Header */}
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome to Airbnb
        </h2>
        <p className="text-sm text-gray-500">Create an account</p>
      </div>

      {/* Form */}
      <form className="space-y-8">
        <Input
          label="Name"
          name="name"
          type="text"
          value={""}
          onChange={() => {}}
        />
        <Input
          label="Email"
          name="email"
          type="text"
          value={""}
          onChange={() => {}}
        />
        <Input
          label="Password"
          name="password"
          type="text"
          value={""}
          onChange={() => {}}
        />
        <Button type="submit">Continue</Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white text-gray-500">Or</span>
          </div>
        </div>

        <Button type="button" variant="outline" icon={<FcGoogle size={22} />}>
          Continue with Google
        </Button>

        {/* Footer */}
        <p className="text-gray-500 text-center text-sm mt-6">
          Already have and account?{" "}
          <span
            onClick={openLogin}
            className="text-primary cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default RegisterModal;
