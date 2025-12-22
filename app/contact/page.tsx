"use client";
import{useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function contact(){
    const [status, setStatus]= useState<"idle"|"sending"|"sent"|"error">("idle");
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const data = new FormData(form);
        try{
            const res=await fetch("https://formspree.io/f/YOUR_FORM_ID",{
                method:"POST",
                headers:{"Accept": "application/json"},
                body: data
            });
            if (res.ok) setStatus("sent"); else setStatus("error");
            form.reset();
        } catch {
            setStatus("error");
        }
    }
    return (
        <>
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-3xl font-bold">Book a free consult</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input name="name" placeholder="Your name" required className="w-full border px-3 py-2 rounded"/>
            <input name="email" type="email" placeholder="Email" required className="w-full border px-3 py-2 rounded"/>
            <input name="phone" placeholder="Phone (optional)" className="w-full border px-3 py-2 rounded"/>
            <textarea name="message" placeholder="Tell us about your event…" required className="w-full border px-3 py-2 rounded h-32"/>
            <button disabled={status==="sending"} className="px-5 py-3 bg-black text-white rounded">
            {status==="sending" ? "Sending…" : "Send"}
            </button>
            {status==="sent" && <p className="text-green-600">Thanks! We’ll reply soon.</p>}
            {status==="error" && <p className="text-red-600">Something went wrong. Try again.</p>}
          </form>
        </main>
        <Footer />
        </>
    );
}