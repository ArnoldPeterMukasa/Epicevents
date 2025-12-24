import Header from "@/components/header";
import Footer from "@/components/footer";
export default function services(){
    return(
        <>
        <Header/>
        <main className="mx-auto max-w-6x1 px-4 py-12">
            <h1 className="text-3x1 font-bold">Services&Packages</h1>
            <ul className="mt-6 space-y-4 list-disc pl-5">
                <li><b>Silver:</b>Day of coordination</li>
                <li><b>Gold:</b>Partial Planning + Vendor Management</li>
                <li><b>Platinum:</b>Full Planning + Styling</li>
            </ul>
            <p className="mt-8">Need Custom? <a className="underline" href="/contact">Tell us your vibe</a>.</p>
        </main>
        <Footer/>
        </>
    );
}