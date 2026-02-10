import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="mt-20 lg:mt-26 px-4 md:px-20 py-2">{children}</div>;
};

export default Container;
