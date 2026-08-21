export default function RechtlichesContent() {
  return (
    <div className="prose prose-sm max-w-none">
      <h3 className="text-lg font-bold mb-4">Datenschutzerklärung</h3>

      <div className="space-y-6">
        <div>
          <p className="font-medium">1. Datenschutz auf einen Blick</p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-2">
            Diese Website ist eine rein statische Portfolio-Seite. Es gibt keine Cookies, kein
            Tracking und keine Analyse-Tools. Beim Hosting fallen lediglich technische
            Zugriffsdaten an. Näheres dazu steht in Abschnitt 2.
          </p>
        </div>

        <div>
          <p className="font-medium">2. Hosting</p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-2">
            Diese Website wird bei der Hetzner Online GmbH gehostet. Beim Aufruf der Website können
            technische Informationen (z. B. IP-Adresse, Browser-Typ, Datum und Uhrzeit des Zugriffs)
            durch den Hosting-Provider in Serverprotokollen verarbeitet werden. Weitere Informationen
            finden Sie in der{' '}
            <a
              href="https://www.hetzner.com/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-zinc-50 hover:underline"
            >
              Datenschutzerklärung von Hetzner
            </a>
            .
          </p>
        </div>

        <div>
          <p className="font-medium">3. Kontaktaufnahme</p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-2">
            Bei Kontaktaufnahme über die angegebene E-Mail-Adresse werden die übermittelten Daten
            (Name, E-Mail-Adresse, Nachricht) ausschließlich zum Zweck der Bearbeitung der Anfrage
            gespeichert. Diese Daten werden nicht an Dritte weitergegeben.
          </p>
        </div>

        <div>
          <p className="font-medium">4. Externe Links</p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-2">
            Diese Website enthält Links zu externen Websites (GitHub, LinkedIn). Für deren Inhalte
            und Datenschutzpraktiken bin ich nicht verantwortlich. Bitte beachten Sie die jeweiligen
            Datenschutzerklärungen der verlinkten Websites:
          </p>
          <ul className="list-disc list-inside text-sm text-secondary dark:text-zinc-400 mt-2 space-y-1">
            <li>
              GitHub:{' '}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-zinc-50 hover:underline"
              >
                Privacy Statement
              </a>
            </li>
            <li>
              LinkedIn:{' '}
              <a
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-zinc-50 hover:underline"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium">5. Ihre Rechte</p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
            Verarbeitung Ihrer personenbezogenen Daten. Da diese Website jedoch keine Daten erhebt,
            fallen diese Rechte hier nicht ins Gewicht. Bei Fragen können Sie mich jederzeit unter
            der angegebenen E-Mail-Adresse kontaktieren.
          </p>
        </div>

        <div>
          <p className="font-medium">6. Verantwortlicher</p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-2">
            Verantwortlich für die Datenverarbeitung auf dieser Website:
          </p>
          <p className="text-sm text-secondary dark:text-zinc-400 mt-1">
            Alexander Kruska<br />
            E-Mail:{' '}
            <a
              href="mailto:6e3078756d@pm.me"
              className="text-primary dark:text-zinc-50 hover:underline"
            >
              6e3078756d@pm.me
            </a>
          </p>
        </div>

        <div className="pt-4 text-xs text-secondary dark:text-zinc-400">
          <p>Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}</p>
        </div>
      </div>
    </div>
  );
}
