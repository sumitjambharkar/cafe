import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import config from '../config';
import { format } from 'date-fns';

const InvoiceContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const HeaderH1 = styled.h1`
  margin: 0;
  font-size: 24px;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const HeaderP = styled.p`
  margin: 5px 0;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailsP = styled.p`
  margin: 5px 0;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InfoDiv = styled.div`
  width: 48%;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 5px;
  }
`;

const TableTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 5px;
  }
`;

const Total = styled.div`
  text-align: right;
  font-weight: bold;
`;

const TotalDiv = styled.div`
  margin-top: 20px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Invoice = () =>  {
  const { id } = useParams();
  const [product, setProduct] = useState({});
 console.log(id);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${config}/sale-product`,{params:{productId:id}});
        setProduct(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const formattedDate = product.createdAt ? format(new Date(product.createdAt), 'dd-MMM-yyyy') : '';
  const formattedTime = product.createdAt ? format(new Date(product.createdAt), 'hh:mm a') : '';

  return (
    <InvoiceContainer>
      <Header>
        <HeaderH1>NUTRITION PLANET PVT LTD</HeaderH1>
        <HeaderP>SHOP NO.A-1 PINK CO-OP.HSG SOC J.P ROAD NEAR 7 BUNGALOWS GARDEN, VERSOVA ANDHERI WEST MUMBAI 400</HeaderP>
        <HeaderP>GSTIN: 27AAECN5900H1ZG</HeaderP>
        <HeaderP>PH.NO: 8976708052</HeaderP>
      </Header>
      <Details>
        <Info>
          <InfoDiv>
            <DetailsP>Time: {formattedTime}</DetailsP>
            <DetailsP>Date: {formattedDate}</DetailsP>
            <DetailsP>Bill Number: A/2425/103</DetailsP>
            <DetailsP>Bill Type: Retail</DetailsP>
            <DetailsP>Name: {product.customer}</DetailsP>
            <DetailsP>Mobile: {product.number}</DetailsP>
          </InfoDiv>
        </Info>
      </Details>
      <Table>
        <thead>
          <tr>
            <TableTh>HSN CODE/ITEM NAME</TableTh>
            <TableTh>Price</TableTh>
            <TableTh>QTY</TableTh>
            <TableTh>Total</TableTh>
          </tr>
        </thead>
        <tbody>
          {product?.basket?.map((doc) => (
            <tr key={doc._id}>
              <TableTd>{doc.name}</TableTd>
              <TableTd>{doc.price}</TableTd>
              <TableTd>{doc.qty}</TableTd>
              <TableTd>{doc.total}</TableTd>
            </tr>
          ))}
          {/* <tr>
            <TableTd colSpan="3" className="total">**DISCOUNT**</TableTd>
            <TableTd>-499.00</TableTd>
          </tr> */}
          <tr>
            <TableTd colSpan="3" className="total">TOTAL:</TableTd>
            <TableTd>{product.totalAmount}</TableTd>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <TableTh>Tax%</TableTh>
            <TableTh>Taxable</TableTh>
            <TableTh>CGST</TableTh>
            <TableTh>SGST</TableTh>
            <TableTh>Tax Amt</TableTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableTd>18.00</TableTd>
            <TableTd>2881.36</TableTd>
            <TableTd>259.32</TableTd>
            <TableTd>259.32</TableTd>
            <TableTd>518.64</TableTd>
          </tr>
          <tr>
            <TableTd colSpan="4" className="total">TOTAL:</TableTd>
            <TableTd>518.64</TableTd>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <TableTh>Description</TableTh>
            <TableTh>Amount</TableTh>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <TableTd>Tendered</TableTd>
            <TableTd>3400.00</TableTd>
          </tr> */}
          <tr>
            <TableTd>{product.paymentMethod}</TableTd>
            <TableTd>{product.totalAmount}</TableTd>
          </tr>
          <tr>
            <TableTd>Credit Balance</TableTd>
            <TableTd>0.00</TableTd>
          </tr>
        </tbody>
      </Table>
      <Total>
        {/* <TotalDiv>YOU HAVE SAVED 499.00/-</TotalDiv> */}
        <TotalDiv>THANK YOU</TotalDiv>
      </Total>
    </InvoiceContainer>
  );
};

export default Invoice;
