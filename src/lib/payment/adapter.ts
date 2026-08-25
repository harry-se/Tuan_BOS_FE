// Payment adapter (requirement 8.2 / 14.2: VNPay/MoMo/PayOS/Stripe chosen
// later depending on legal entity). No gateway credentials/legal entity are
// confirmed yet (requirement 18 #10), so this adapter creates a pending
// order and returns a stub redirect to the order-confirmation page instead
// of a real hosted checkout URL. Card data is never collected or stored by
// this app — real integrations must use the provider's own hosted
// checkout/tokenization, never raw card fields, per requirement 8.2.
export type PaymentProvider = "vnpay" | "momo" | "payos" | "stripe" | "stub";

export interface CheckoutItem {
  type: "book" | "course";
  slug: string;
  title: string;
  priceVnd: number;
}

export interface CheckoutRequest {
  item: CheckoutItem;
  customer: { name: string; email: string; phone?: string };
}

export interface CheckoutResult {
  provider: PaymentProvider;
  orderId: string;
  status: "pending" | "redirect";
  redirectUrl: string;
}

export interface PaymentAdapter {
  createCheckout(req: CheckoutRequest): Promise<CheckoutResult>;
}

class StubPaymentAdapter implements PaymentAdapter {
  async createCheckout(req: CheckoutRequest): Promise<CheckoutResult> {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    console.log("[payment:stub] created pending order:", {
      orderId,
      item: req.item,
      customerEmail: req.customer.email,
    });
    return {
      provider: "stub",
      orderId,
      status: "pending",
      redirectUrl: `/order/confirmation?orderId=${orderId}&status=pending`,
    };
  }
}

export const paymentAdapter: PaymentAdapter = new StubPaymentAdapter();
