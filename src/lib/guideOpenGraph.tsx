import { ImageResponse } from 'next/og';
import type { GuideLocale } from '@/lib/underrepresentedDishesGuide';

export function renderGuideOpenGraph(locale: GuideLocale) {
  const isAz = locale === 'az';
  const title = isAz
    ? 'Görünməyən mətbəxlərin dad atlası'
    : 'A taste atlas of overlooked kitchens';
  const previewDishes = [
    { number: '01', name: 'Vori-vori', place: isAz ? 'Paraqvay · qarğıdalı' : 'Paraguay · corn', background: 'linear-gradient(135deg, #a7472d, #6e2e20)' },
    { number: '02', name: 'Num banh chok', place: isAz ? 'Kamboca · əriştə' : 'Cambodia · noodles', background: 'linear-gradient(135deg, #506e4c, #283f31)' },
    { number: '03', name: 'Ndolé', place: isAz ? 'Kamerun · bitterleaf' : 'Cameroon · bitterleaf', background: 'linear-gradient(135deg, #d19a4a, #8b5725)' },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#201916',
          color: '#fffaf2',
          padding: '54px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-20px',
            top: '-118px',
            display: 'flex',
            fontSize: '420px',
            fontWeight: 800,
            lineHeight: 1,
            color: 'rgba(255,255,255,0.035)',
          }}
        >50</div>

        <div style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2, paddingRight: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase', color: '#e3ad64' }}>
            <div style={{ width: '32px', height: '2px', display: 'flex', background: '#e3ad64' }} />
            Chef İlhamə · 2026 field guide
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: '170px', lineHeight: 0.72, fontWeight: 800, color: '#e3ad64', letterSpacing: '-12px' }}>50</div>
            <div style={{ display: 'flex', marginTop: '34px', maxWidth: '650px', fontSize: '64px', lineHeight: 0.91, fontWeight: 650, letterSpacing: '-2px' }}>{title}</div>
          </div>
          <div style={{ display: 'flex', gap: '30px', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,250,242,0.56)' }}>
            <span>39 {isAz ? 'ölkə' : 'countries'}</span>
            <span>·</span>
            <span>6 {isAz ? 'marşrut' : 'routes'}</span>
            <span>·</span>
            <span>50 {isAz ? 'resept' : 'recipes'}</span>
          </div>
        </div>

        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '8px', transform: 'rotate(2deg) scale(1.08)' }}>
          {previewDishes.map((dish, index) => (
            <div
              key={dish.name}
              style={{
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: index === 1 ? 1.2 : 1,
                borderRadius: '26px',
                background: dish.background,
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '24px 28px',
              }}
            >
              <div style={{ position: 'absolute', right: '-34px', top: '-58px', width: '210px', height: '210px', display: 'flex', borderRadius: '999px', border: '30px solid rgba(255,255,255,0.08)' }} />
              <div style={{ display: 'flex', fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)' }}>{dish.number}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: index === 1 ? '48px' : '42px', lineHeight: 0.95, fontWeight: 700 }}>{dish.name}</div>
                <div style={{ display: 'flex', marginTop: '10px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,255,255,0.62)' }}>{dish.place}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
