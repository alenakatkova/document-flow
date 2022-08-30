import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import {NextPage} from "next";
import {UserFromDB} from "../interfaces/user";

// example from Next.js https://github.com/vercel/next-learn/blob/master/basics/typescript-final/components/layout.tsx

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <header>
          HEADER
        </header>
        <main>{children}</main>
        <footer>FOOTER</footer>
      </div>
  )
}

export default Layout;