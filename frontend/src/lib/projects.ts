export interface Project {
  slug: string;
  title: string;
  description: string;
  githubRepo: string; // Format: "owner/repo"
  tech: string[];
  type: string;
  liveUrl?: string;
  features?: string[];
  image?: string;
  about?: string;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'structify',
    title: 'structify',
    description: 'Go-Structs zu PostgreSQL-Schemas konvertieren, mit Web-Editor und Inline-Tags für Constraints, Indexes und Foreign Keys.',
    githubRepo: 'n0xum/structify',
    tech: ['Go', 'PostgreSQL', 'Next.js', 'TypeScript', 'Docker'],
    type: 'Full-Stack',
    liveUrl: 'https://structify.alexander-kruska.dev',
    features: [
      'Go-Structs mit db:-Tags zu SQL-DDL konvertieren',
      'Constraints: CHECK, DEFAULT, ENUM',
      'Indexes und Composite Indexes',
      'Foreign Keys mit ON DELETE / ON UPDATE',
      'Composite Primary Keys und Foreign Keys',
      'Interaktiver Web-Editor mit Live-Generierung',
      'Dokumentationsseite mit Try-it-Buttons',
      'CI/CD mit GitHub Actions, SonarQube, Docker'
    ],
    codeSnippet: {
      language: 'go',
      description: 'Go-Struct mit db:-Tags wird automatisch zu PostgreSQL-DDL konvertiert',
      code: `type User struct {
\tID       int64  \`db:"pk"\`
\tUsername string \`db:"unique"\`
\tEmail    string \`db:"check:length(email) > 0"\`
\tStatus   string \`db:"enum:active,inactive,banned"\`
\tActive   bool   \`db:"default:true"\`
}`
    }
  },
  {
    slug: 'zigbee-controller',
    title: 'zigbee-controller',
    description: 'Zigbee-Geräte über Zigbee2MQTT und MQTT mit Apple HomeKit verbinden. Läuft vollständig im eigenen Netzwerk, ohne Cloud-Zugriff.',
    githubRepo: 'n0xum/zigbee-controller',
    tech: ['Go', 'MQTT', 'Zigbee2MQTT', 'HomeKit (HAP)', 'Docker'],
    type: 'Backend',
    features: [
      'HomeKit-Bridge über das HAP-Protokoll (brutella/hap): Lampen und Scrollrad erscheinen als native Apple-HomeKit-Accessories',
      'MQTT-Anbindung an Zigbee2MQTT (Eclipse Paho) mit bidirektionaler Zustandssynchronisierung zwischen HomeKit und den Geräten',
      'Physisches Dimmen per Scrollrad über zwei MQTT-Befehle pro Geste statt eines Broadcasts pro Zwischenschritt, inklusive automatischer Korrektur bei zu niedriger Helligkeit',
      'YAML-Konfiguration (Viper) für MQTT-Broker, HomeKit-Parameter und Geräte, inklusive Schnittstellen-Filter für die mDNS-Ankündigung im Docker-Host-Netzwerk',
      'Containerisiert mit einem mehrstufigen Dockerfile (Non-Root-User) sowie docker-compose für Mosquitto und Zigbee2MQTT, gesteuert über ein Makefile',
      'CI-Pipeline (GitHub Actions) mit go vet und go test bei jedem Push sowie Image-Build und -Push nach ghcr.io beim Merge auf main'
    ],
    codeSnippet: {
      language: 'go',
      description: 'Scrollrad-Dimmer: zwei MQTT-Befehle pro Geste (Start/Stop) statt eines Broadcasts pro Zwischenschritt. Die Lampe interpoliert die Helligkeit selbst',
      code: `// Start beginnt das Dimmen in die angegebene Richtung.
// Ein bereits laufender Vorgang wird zuvor beendet.
func (d *Dimmer) Start(action zigbee.RemoteAction) {
\tdir := 0
\tswitch action {
\tcase zigbee.ActionBrightnessMoveUp:
\t\tdir = 1
\tcase zigbee.ActionBrightnessMoveDown:
\t\tdir = -1
\tdefault:
\t\treturn
\t}

\td.Stop()

\td.mu.Lock()
\td.aktiv = true
\td.generation++
\td.mu.Unlock()

\tcmd := zigbee.BrightnessMoveCommand(d.rate * dir)
\tfor _, b := range d.bulbs {
\t\t// Ausgeschaltete Lampen bleiben aus -- "brightness_move" würde sie
\t\t// ohnehin nicht wecken, aber so wird gar nicht erst gefunkt.
\t\tif on, _, _ := b.GetState(); !on {
\t\t\tcontinue
\t\t}
\t\td.publishTo(b, cmd)
\t}
}`
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug);
}