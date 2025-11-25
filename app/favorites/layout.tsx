import NavbarComponent from "../explore/components/TopNavBar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavbarComponent />
            {children}
        </>
    );
}
