export const coupons = [
  { code: 'WELCOME10', percentOff: 10, label: '10% off your first course' },
  { code: 'FOUNDATION15', percentOff: 15, label: '15% off Foundation Programme' },
]

export function findCoupon(code) {
  if (!code) return null
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase()) || null
}