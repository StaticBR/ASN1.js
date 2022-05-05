import { HexBlock, HexBlockJson, HexBlockParams } from "../HexBlock";
import { ValueBlock, ValueBlockJson, ValueBlockParams } from "../ValueBlock";

export interface LocalPrimitiveValueBlockParams extends HexBlockParams, ValueBlockParams { }
export interface LocalPrimitiveValueBlockJson extends HexBlockJson, ValueBlockJson { }

export class LocalPrimitiveValueBlock extends HexBlock(ValueBlock) {

  public static override NAME = "PrimitiveValueBlock";

  constructor({
    isHexOnly = true,
    ...parameters
  }: LocalPrimitiveValueBlockParams = {}) {
    super(parameters);

    this.isHexOnly = isHexOnly;
  }

}

export interface LocalPrimitiveValueBlock {
  /**
   * @deprecated since version 3.0.0
   */
  get valueBeforeDecode(): ArrayBuffer;
  /**
   * @deprecated since version 3.0.0
   */
  set valueBeforeDecode(value: ArrayBuffer);
  /**
   * Binary data in ArrayBuffer representation
   *
   * @deprecated since version 3.0.0
   */
  set valueHex(v: ArrayBuffer);
  /**
   * Binary data in ArrayBuffer representation
   *
   * @deprecated since version 3.0.0
   */
  get valueHex(): ArrayBuffer;
}
