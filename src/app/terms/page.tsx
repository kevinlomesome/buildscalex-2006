export const metadata = {
  title: "Terms & Conditions | Build Scale X",
  description: "Terms & Conditions for Build Scale X",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
        <p className="mb-8 text-sm text-silver">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-silver">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials on Build Scale X's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on Build Scale X's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              All the materials on Build Scale X's website are provided "as is". Build Scale X makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Build Scale X does not make any representations concerning the accuracy or reliability of the use of the materials on its website or otherwise relating to such materials or any sites linked to this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
            <p className="mb-4">
              Build Scale X or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Build Scale X's website, even if Build Scale X or an authorize representative of this website has been notified, orally or written, of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Revisions and Errata</h2>
            <p className="mb-4">
              The materials appearing on Build Scale X's website may include technical, typographical, or photographic errors. Build Scale X will not promise that any of the materials in this website are accurate, complete, or current. Build Scale X may change the materials contained on its website at any time without notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
