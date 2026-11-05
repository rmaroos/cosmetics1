import type { Review } from '../types/catalog';
import { img } from './images';

export const reviews: Review[] = [
{ id: 'r01', productId: 'p05', author: 'Nadeesha P.', rating: 5, title: 'Finally comfortable skin', body: 'My skin gets tight in air-conditioned offices and this has been the only cream that keeps it comfortable all day. No pilling under sunscreen.', createdAt: '2026-10-02', verified: true, photos: [img.creamJar] },
{ id: 'r02', productId: 'p05', author: 'Ayesha R.', rating: 5, title: 'Calmed my redness', body: 'I have sensitive skin and this didn’t sting at all. Redness around my nose looks calmer after two weeks.', createdAt: '2026-09-14', verified: true },
{ id: 'r03', productId: 'p05', author: 'Kavindu S.', rating: 4, body: 'Good moisturiser, a little rich for daytime in Colombo heat but perfect at night.', createdAt: '2026-08-21', verified: false },
{ id: 'r04', productId: 'p05', author: 'Shalini M.', rating: 5, title: 'Repurchased three times', body: 'The 100 ml size is great value. Texture is lovely and it has no scent.', createdAt: '2026-07-30', verified: true },
{ id: 'r05', productId: 'p05', author: 'Tharushi W.', rating: 3, body: 'Nice cream but I didn’t notice a big difference compared to my old one.', createdAt: '2026-06-11', verified: true },

{ id: 'r06', productId: 'p07', author: 'Dilini K.', rating: 5, title: 'No white cast on my skin', body: 'As someone with medium-deep skin, most mineral sunscreens look grey on me. This one blends in completely.', createdAt: '2026-10-20', verified: true, photos: [img.journalSunscreen] },
{ id: 'r07', productId: 'p07', author: 'Imran F.', rating: 4, body: 'Light and doesn’t make me oily. Wish it came in a bigger size.', createdAt: '2026-09-03', verified: true },
{ id: 'r08', productId: 'p07', author: 'Sachini L.', rating: 5, body: 'Wear it daily under makeup. It sits beautifully.', createdAt: '2026-08-12', verified: false },
{ id: 'r09', productId: 'p07', author: 'Ruwan J.', rating: 4, title: 'Good everyday SPF', body: 'Easy to reapply over the day. Slight tint is a plus.', createdAt: '2026-05-28', verified: true },

{ id: 'r10', productId: 'p01', author: 'Hiruni A.', rating: 5, title: 'Gentle and effective', body: 'Removes my sunscreen easily and my face never feels tight afterwards.', createdAt: '2026-10-11', verified: true },
{ id: 'r11', productId: 'p01', author: 'Mihiri D.', rating: 4, body: 'Lovely cleanser, very low foam which I like. The pump bottle would be nicer.', createdAt: '2026-09-07', verified: true },
{ id: 'r12', productId: 'p01', author: 'Zara N.', rating: 5, body: 'My go-to for both morning and night. Calms my skin after workouts.', createdAt: '2026-07-19', verified: false },

{ id: 'r13', productId: 'p11', author: 'Pavithra G.', rating: 5, title: 'Brighter in a month', body: 'Been using it every morning for about five weeks — my skin looks more even and glowy.', createdAt: '2026-10-25', verified: true },
{ id: 'r14', productId: 'p11', author: 'Nethmi U.', rating: 4, body: 'Doesn’t sting like other vitamin C serums I tried. Takes time to see results.', createdAt: '2026-09-18', verified: true },
{ id: 'r15', productId: 'p11', author: 'Anjali V.', rating: 4, body: 'Nice texture and absorbs fast.', createdAt: '2026-08-02', verified: false },

{ id: 'r16', productId: 'p20', author: 'Sanduni H.', rating: 5, title: 'Perfect everyday nude', body: 'Rose Nude is the ideal my-lips-but-better shade on my skin tone. Comfortable all day.', createdAt: '2026-10-08', verified: true, photos: [img.lipstick] },
{ id: 'r17', productId: 'p20', author: 'Fathima Z.', rating: 4, body: 'Terracotta is gorgeous. Needs a touch-up after meals.', createdAt: '2026-08-27', verified: true },
{ id: 'r18', productId: 'p20', author: 'Chamodi B.', rating: 5, body: 'Not drying at all, which is rare for a matte lipstick.', createdAt: '2026-07-05', verified: false },

{ id: 'r19', productId: 'p29', author: 'Lakmini T.', rating: 5, title: 'Absorbs so quickly', body: 'Not sticky even in humid weather. The coconut scent is subtle and lovely.', createdAt: '2026-09-29', verified: true },
{ id: 'r20', productId: 'p29', author: 'Rashmi E.', rating: 5, body: 'Whole family uses it now. The 500 ml is great value.', createdAt: '2026-08-15', verified: true },
{ id: 'r21', productId: 'p29', author: 'Kasun P.', rating: 4, body: 'Good daily lotion, does what it says.', createdAt: '2026-06-20', verified: false },

{ id: 'r22', productId: 'p03', author: 'Oshadi M.', rating: 4, body: 'Very hydrating, I layer it twice at night.', createdAt: '2026-09-10', verified: true },
{ id: 'r23', productId: 'p03', author: 'Vimukthi R.', rating: 5, title: 'Great price on offer', body: 'Bought on sale and will repurchase at full price — my dry cheeks love it.', createdAt: '2026-10-14', verified: true },

{ id: 'r24', productId: 'p12', author: 'Senuri K.', rating: 4, title: 'Less shine by noon', body: 'Helps with oiliness on my T-zone. Can pill if I use too much.', createdAt: '2026-11-01', verified: true },
{ id: 'r25', productId: 'p12', author: 'Akila D.', rating: 5, body: 'My pores look smaller and my makeup lasts longer.', createdAt: '2026-10-30', verified: false },

{ id: 'r26', productId: 'p25', author: 'Ishara W.', rating: 5, title: 'Elegant and long-lasting', body: 'Gets compliments every time I wear it. Lasts through a full workday.', createdAt: '2026-09-22', verified: true },
{ id: 'r27', productId: 'p25', author: 'Malsha S.', rating: 4, body: 'Beautiful jasmine, a little strong at first spray but settles nicely.', createdAt: '2026-07-11', verified: true },

{ id: 'r28', productId: 'p21', author: 'Thilini J.', rating: 4, body: 'Shade 420 is a great match for me. Natural finish, buildable.', createdAt: '2026-10-29', verified: true },
{ id: 'r29', productId: 'p22', author: 'Gayathri N.', rating: 5, title: 'Every shade is wearable', body: 'Blends easily, great pigment for the price, especially on offer.', createdAt: '2026-08-09', verified: true },
{ id: 'r30', productId: 'p22', author: 'Hasini F.', rating: 4, body: 'Lovely warm tones. The shimmers are the best part.', createdAt: '2026-06-17', verified: false },
{ id: 'r31', productId: 'p13', author: 'Dinusha A.', rating: 4, body: 'Started slowly as advised. Skin looks smoother after six weeks with no peeling.', createdAt: '2026-09-01', verified: true },
{ id: 'r32', productId: 'p31', author: 'Prabha L.', rating: 5, body: 'My hair feels so much softer and the scent is fresh and herbal.', createdAt: '2026-08-30', verified: true }];