import { Formbased } from "../formbased";
import { GetFormResponse } from "../interfaces";

export class Forms {
  constructor(private readonly formbased: Formbased) {}

  async use(formId: string): Promise<GetFormResponse> {
    return await this.formbased.get<GetFormResponse>(`/forms/${formId}`);
  }
}
