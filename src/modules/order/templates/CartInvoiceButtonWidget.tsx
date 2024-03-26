"use client";

import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
// import companyLogo from ".../build/images/logo.jpeg";
import { Order } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"

const CartInvoiceButtonWidget = ({ order }: { order: Order }) => {
  const [showInvoice, setShowInvoice] = useState(false);

  const handleGenerateInvoice = () => {
    setShowInvoice(true);
  };

  //  const companyLogo = "https://cdn.vox-cdn.com/thumbor/2ECtQus43_-tjqtlxy0WE8peSEQ=/0x0:2012x1341/1400x1050/filters:focal(1006x670:1007x671)/cdn.vox-cdn.com/uploads/chorus_asset/file/15483559/google2.0.0.1441125613.jpg";

  const totalItems = order.items.reduce((total, item) => total + item.quantity, 0);

  const InvoiceDocument = () => (
    <Document>
      <Page size="A4">
        <View style={styles.page}>
          <View style={styles.header}>
            {/* <View style={styles.logoContainer}>
          <Image src={companyLogo} style={styles.logo} /> */}
            <Text style={styles.headerText}>Flagstaff Wholesale</Text>
            {/* </View> */}
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>Flagstaff Wholesale</Text>
              <Text style={styles.addressText}>1490 South Riordan Ranch St.</Text>
              <Text style={styles.addressText}>Flagstaff, AZ</Text>
            </View>
          </View>
          <View style={styles.main}>
            <Text style={styles.headerText}>Invoice</Text>
            <View style={styles.hr}></View>
            <View style={styles.infoContainer}>
              <View style={styles.invoiceContainer}>
                <View style={styles.invoiceName}>
                  <Text style={styles.addressText}>Invoice Number: </Text>
                  <Text style={styles.addressText}>Invoice Date: </Text>
                  <Text style={styles.addressText}>Total Quantity: </Text>
                </View>
                <View style={styles.invoiceName}>
                  <Text style={styles.addressTextNumber}>{`#${order.display_id}`}</Text>
                  <Text style={styles.addressText}>{new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</Text>
                  <Text style={styles.addressText}>{totalItems}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.addressTextNumber}>{`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}</Text>
                {(order.shipping_address.address_1 || order.shipping_address.address_2) && (
                    <Text style={styles.addressText}>
                        {`${order.shipping_address.address_1}${order.shipping_address.address_2 ? `, ${order.shipping_address.address_2}` : ''}`}
                    </Text>
                )}
                <Text style={styles.addressText}>{`${order.shipping_address.postal_code}, ${order.shipping_address.city}, ${order.shipping_address.country_code}`}</Text>
                {order.customer && (order.customer as any)?.licenseNumber ? (
    <Text style={{ ...styles.addressText, fontWeight: 'ultrabold' }}>License Number: {(order.customer as any).licenseNumber}</Text>
) : null}

            </View>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.details}>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableColumnName, marginRight: 10 }}>Item</Text>
                <Text style={{ ...styles.tableColumnName, marginRight: 60 }}>Description</Text>
                <Text style={styles.tableColumnName}>Price</Text>
                <Text style={{ ...styles.tableColumnName, marginLeft: 10 }}>Quantity</Text>
                <Text style={{ ...styles.tableColumnName, marginRight: -5 }}>Total</Text>
              </View>
              <View style={styles.hr}></View>
            {order.items.map((item, index) => (
                <View key={index}>
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableColumn, marginRight: 20 }}>{item.title}</Text>
                        <Text style={{ ...styles.tableColumn, marginRight: 70 }}>{item.description}</Text>
                        <Text style={styles.tableColumn}>${(item.unit_price / 100).toFixed(2)}</Text>
                        <Text style={{ ...styles.tableColumn, marginLeft: 30 }}>{item.quantity}</Text>
                        <Text style={styles.tableColumn}>${(item.total ?? 0 / 100).toFixed(2)}</Text>
                    </View>
                    <View style={styles.hr}></View>
                </View>
            ))}
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableColumn, textAlign: 'right', marginTop: 10 }}>Subtotal</Text>
                <Text style={{ ...styles.tableColumn, textAlign: 'right', marginRight: 59, marginTop: 10 }}>${(order.subtotal / 100).toFixed(2)}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableColumn, textAlign: 'right', marginTop: 10 }}>Shipping</Text>
                <Text style={{ ...styles.tableColumn, textAlign: 'right', marginRight: 59, marginTop: 10 }}>${(order.shipping_total / 100).toFixed(2)}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableColumn, textAlign: 'right', marginTop: 10, fontSize: 20 }}>Total</Text>
                <Text style={{ ...styles.tableColumn, textAlign: 'right', marginRight: 59, marginTop: 10, fontSize: 20 }}>${(order.total / 100).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thanks for doing business with us!</Text>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      padding: 50,
    },
    addressContainer: {
      alignItems: 'flex-end',
    },
    addressText: {
      fontSize: 10,
      color: '#444444',
      fontFamily: 'Helvetica',
    },
    addressTextNumber: {
      fontSize: 10,
      color: '#111111',
      fontFamily: 'Helvetica',
      fontWeight: 'ultrabold',
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    header: {
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerText: {
      fontSize: 20,
      color: '#444444',
      fontFamily: 'Helvetica',
    },
    main: {
      marginBottom: 20,
    },
    invoiceTitle: {
      fontSize: 20,
      color: '#444444',
    },
    hr: {
      borderTop: '1px solid #888888',
      marginVertical: 10,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tableColumn: {
      color: '#444444',
      fontFamily: 'Helvetica',
      fontSize: 10,
      flex: 1, // This ensures each column takes up an equal amount of space
    },
    tableColumnName: {
      fontWeight: 'bold', // 'ultrabold' is not a valid value for fontWeight in React Native
      color: '#111111',
      fontFamily: 'Helvetica',
      fontSize: 10,
      flex: 1, // This ensures each column takes up an equal amount of space
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    item: {
      marginLeft: 20,
      marginTop: 5,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      zIndex: 1000,
      borderRadius: 10,
    },
    viewerContainer: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      display: 'flex',
      flexDirection: 'row',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      border: '1px solid #000000',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    logo: {
      width: 60,
      height: 'auto',
      marginRight: 10,
    },
    invoiceContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 100,
    },
    invoiceName: {
      marginRight: 20,
    },
    details: {
      marginTop: '10%',
    },
    grandTotal: {
      marginTop: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 30, // Adjust as needed
      left: 50, // Adjust as needed
      right: 50, // Adjust as needed
      textAlign: 'center',
    },
    footerText: {
      fontSize: 12,
      color: '#444444',
      fontFamily: 'Helvetica',
    },
  });


  return (
    <div className="mt-6 flex justify-start pb-5">
      <Button
        className="btn btn-secondary btn-small flex items-center py-2 px-4"
        onClick={handleGenerateInvoice}
      >
        Generate Invoice
      </Button>
      {showInvoice && (
        <div style={styles.overlay}>
          <div style={styles.buttonContainer}>
            <PDFDownloadLink document={<InvoiceDocument />} fileName={`invoice-${order.display_id}-${order.shipping_address.last_name}-${order.shipping_address.first_name}.pdf`}>
              {({ blob, url, loading, error }) => (
                <button style={styles.button}>
                  {loading ? "Loading..." : error ? "Error occurred" : "Download Invoice"}
                </button>
              )}
            </PDFDownloadLink>
            <Button
              className="btn btn-secondary btn-small flex items-center py-2 px-4"
              onClick={() => setShowInvoice(false)}
              style={styles.button}
            >
              Close
            </Button>
          </div>
          <div style={styles.viewerContainer}>
            <PDFViewer width="100%" height="100%">
              <InvoiceDocument />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartInvoiceButtonWidget;