//placeholder grid
import Header from "@/components/header";
import Footer from "@/components/footer";
//import Hero from "@/components/hero";

export default function gallery(){
    return(
        <>
            <Header />
            <main className="min-h-screen">
                <div className="mx-auto max-w-6xl px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">gallery</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({length:6}).map((_,i)=>(
                            <div key={i} className="aspect-[4/3] border rounded-lg"/>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
