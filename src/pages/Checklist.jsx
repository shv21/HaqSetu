import Checklist from '../components/Checklist.jsx';

export default function ChecklistPage({ lang, matchedSchemes }) {
  return (
    <main>
      <Checklist lang={lang} matchedSchemes={matchedSchemes || []} />
    </main>
  );
}
