# CV ya Hussein Ali Abdulrahman

CV ya umma huonyesha muonekano na taarifa za awali kutoka `public/cv-design.html`, `public/images` na `public/certificates` hata Supabase ikiwa haijaunganishwa au tables bado hazipo. Muonekano huo hubaki bila kubadilika; taarifa za Supabase hutumika pale tu zinapopatikana. `/admin` ina login na dashboard ya kusimamia wasifu, elimu, uzoefu, ujuzi, mafanikio, vyeti na fonti/rangi.

## Mahitaji

- Node.js na npm
- Supabase project
- Akaunti ya msimamizi iliyosajiliwa kwenye Supabase Auth

## Kuunganisha Supabase

1. Hakikisha `.env` ina `VITE_SUPABASE_URL` na `VITE_SUPABASE_PUBLISHABLE_KEY`. Usishiriki au kuweka publishable key ya project nyingine hapa; usitumie `service_role` key kwenye browser.
2. Kwenye Supabase Dashboard, fungua **SQL Editor**, kisha endesha faili [`supabase/schema.sql`](./supabase/schema.sql). Hii huunda tables, data ya mwanzo, bucket ya `cv-assets`, na RLS policies.
3. Kwenye **Authentication → Users**, tengeneza/ongeza akaunti yako ya kuingia. Kwenye SQL Editor, weka UUID ya akaunti hiyo hapa chini na endesha query:

   ```sql
   insert into public.cv_admins (user_id)
   values ('WEKA-UUID-YA-AKKAUNTI-YAKO-HAPA');
   ```

   UUID inaonekana kwenye orodha ya watumiaji wa Supabase Auth. Hakikisha ni akaunti yako pekee unayoiongeza kwenye `cv_admins`.
4. Anzisha app ukiwa ndani ya folda ya `my-react-app`. Ikiwa PowerShell prompt inaishia na `\mycv>`, kwanza ingia kwenye folda ya app:

   ```powershell
   cd .\my-react-app
   npm install
   npm run dev
   ```

   Ukiona `PS ...\mycv\my-react-app>`, tayari uko kwenye folda sahihi na unaweza kuendesha `npm run dev`.

5. CV ya umma inaonekana kwenye ukurasa wa mwanzo bila kuhitaji tables za Supabase. Ili kuhariri taarifa, fungua `https://anwani-ya-tovuti-yako/admin` (au `http://localhost:5173/admin` ukiwa kwenye maendeleo) na uingie kwa akaunti uliyoidhinisha. Tables na RLS zinahitajika kwa dashboard pekee.
6. Ikiwa schema ya awali tayari iliendeshwa, endesha tena [`supabase/schema.sql`](./supabase/schema.sql) kwenye Supabase **SQL Editor**. Faili hii inaongeza sehemu za footer, gallery, hobbies, professional training, referees, mipangilio ya lugha/mandhari na viambatisho vya vyeti; inaweza kuendeshwa tena bila kuongeza nakala za data ya mwanzo.

Njia ya `/admin` inaonyesha ukurasa wa kuingia kwa msimamizi; ruhusa za kuhariri zinathibitishwa tena na Supabase RLS kwa UUID zilizoongezwa kwenye `cv_admins`. Hakikisha hosting yako inaelekeza njia zisizolingana na faili tuli kwenda kwenye `index.html` ili URL ya `/admin` ifanye kazi baada ya deployment.

## Kutumia dashboard

- **Wasifu:** hariri jina, mawasiliano, maelezo na viungo; pakia picha ya wasifu (JPG, PNG au WebP hadi 10 MB) au urudie picha ya kawaida.
- **Elimu:** ongeza, hariri au futa taarifa na ambatisha vyeti na transcript tofauti (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili).
- **Uzoefu, ujuzi na mafanikio:** ongeza, hariri au futa taarifa na ambatisha vyeti vingi vya JPG, PNG, WebP au PDF hadi 10 MB kwa kila faili; vinafunguka kwenye CV.
- **Professional Training na Hobbies:** simamia kuongeza, kuhariri na kufuta mafunzo na hobbies zinazoonekana kwenye CV.
- **Referees:** ongeza, hariri au futa majina, nyadhifa, taasisi na mawasiliano ya referees.
- **Vyeti:** pakia JPG, PNG, WebP au PDF hadi 10 MB kwa kila faili. Unaweza kuchagua kurasa nyingi za cheti kimoja; zitaonekana kama vichupo kwenye dirisha la cheti.
- **Picha:** pakia JPG, PNG au WebP hadi 10 MB; ongeza kichwa/maelezo, badili picha au futa kutoka sehemu ya gallery kwenye CV.
- **Footer:** badili maelezo na ongeza, hariri au futa viungo vya mitandao/mawasiliano.
- **Muonekano:** chagua lugha ya CV (English, Kiswahili au العربية), Light/Dark mode, fonti na rangi kuu; mabadiliko yanaonekana mara moja kwenye CV baada ya kuhifadhi.
- **Pakua / Chapisha CV:** tumia print dialog ya kivinjari kuhifadhi CV kama PDF.

RLS inaruhusu umma kusoma CV lakini inaruhusu mabadiliko kwa UUID zilizo kwenye `cv_admins` pekee. Faili za vyeti zina URL za umma kwa sababu zinaonyeshwa kwenye CV; usipakie nyaraka binafsi.

## Amri za maendeleo

```sh
npm run dev
npm run lint
npm run build
```
