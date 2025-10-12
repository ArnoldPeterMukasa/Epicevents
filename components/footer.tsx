export default function Footer() {
    return (
        <footer className="mt-16 border-t">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
                <p>© {new Date().getFullYear()}Epic Marketing and Events. All rights reserved</p>
                <p className="mt-2">Kampala • Weddings • Corporate • Parties • Baby Showers</p>
            </div>
        </footer>
    );
}