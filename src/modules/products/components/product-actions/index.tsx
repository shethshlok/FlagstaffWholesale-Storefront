"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"


type ProductActionsProps = {
  product: PricedProduct
  region: Region
}

type OptionState = Record<string, string | string[]>
type QuantityState = Record<string, number>
export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
}: ProductActionsProps) {
  const [options, setOptions] = useState<OptionState>({})
  
  const [quantities, setQuantities] = useState<QuantityState>({})
  const [isAdding, setIsAdding] = useState(false)

  const countryCode = useParams().countryCode as string

  const variants = product.variants

  // for mobile actions
    // add the selected variant to the cart
    const [mobileOptions, setMobileOptions] = useState<Record<string, string>>({})
    const handleMobileAddToCart = async () => {
      if (!variant?.id) return null
  
      setIsAdding(true)
  
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode,
      })
  
      setIsAdding(false)
    }
      // update the options when a variant is selected
  const updateMobileOptions = (update: Record<string, string>) => {
    setMobileOptions({ ...mobileOptions, ...update })
  }

  // initialize the option and quantity state
  useEffect(() => {
    const optionObj: OptionState = {};
    const quantityObj: QuantityState = {};

    for (const option of product.options || []) {
      optionObj[option.id] = [];
    }

    setOptions(optionObj);
    setQuantities(quantityObj);
  }, [product])


  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
        break
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

// update the options and quantities when a variant is selected
const updateOptions = (optionId: string, value: string, quantity: number) => {
  setOptions((prevOptions) => ({
    ...prevOptions,
    [optionId]: Array.isArray(prevOptions[optionId])
      ? [...prevOptions[optionId] as string[], value]
      : value,
  }));
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [optionId]: quantity,
  }));
}

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (variant && !variant.inventory_quantity) {
      return false
    }

    if (variant && variant.allow_backorder === false) {
      return true
    }
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)
  type OptionState = Record<string, string | string[]>;
  const inView = useIntersection(actionsRef, "0px")

// Add the selected variant to the cart
const handleAddToCart = async () => {
  setIsAdding(true);

  console.log("Quantities are: ", quantities);

  // Iterate through selected variants and add them to cart with respective quantities
  for (const variantId of Object.keys(quantities)) {
    const variant = variants.find((v) => v.id === variantId);
    if (variant) {
      await addToCart({
        variantId,
        quantity: quantities[variantId],
        countryCode,
      });
    }
  }

  setQuantities(Object.fromEntries(Object.keys(quantities).map(key => [key, 0]))); // Reset quantities to 0
  setIsAdding(false);
}

  useEffect(() => {
    if (variants.length > 0 && variants[0].id) {
      setOptions(variantRecord[variants[0].id]);
      setQuantities(Object.fromEntries(Object.keys(quantities).map(key => [key, 0]))); // Reset quantities to 0
    }
  }, [variants, variantRecord]);

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              <table className="border-collapse border rounded">
                <thead>
                 <tr>
                    <th className="border border-gray-300 p-2">Variant</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                 </tr>
                </thead>
                <tbody>
                {variants.map((variant) => (
                    <tr key={variant.id}>
                      {variant.options && variant.options.map((option) => (
                        <td
                          key={option.option_id}
                          className="border border-gray-300 p-2"
                        >
                          {option.value}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        <select
                          value={quantities[String(variant.id)] || 0}
                          onChange={(e) =>
                            setQuantities((prevQuantities) => ({
                              ...prevQuantities,
                              [String(variant.id)]: parseInt(e.target.value),
                            }))
                          }
                          className="p-1 rounded"
                        >
                          {Array.from(Array(10), (_, index) => index).map((quantity) => (
  <option key={quantity} value={quantity}>
    {quantity}
  </option>
))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Divider />
            </div>
          )}
        </div>
        <ProductPrice product={product} variant={variant} region={region} />

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !variant}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
        >
          {!variant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={mobileOptions}
          updateOptions={updateMobileOptions}
          inStock={inStock}
          handleAddToCart={handleMobileAddToCart}
          isAdding={isAdding}
          show={!inView}
        />
      </div>
    </>
  )
}
