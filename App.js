import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import shoesData from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import About from './routes/About';
import Event from './routes/Event';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

function App() {

  let [shoes, setShoes] = useState(shoesData);
  
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">React Shoes</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link className='navMenu' onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link className='navMenu' onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link className='navMenu' onClick={()=>{navigate('/about')}}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>

        <Route path="/" element={
        <>

          <div className="main-bg"></div>

          <Container>
            <Row>
              <ShoesCard shoes={shoes}></ShoesCard>
            </Row>
          </Container>

          <button onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              let copyShoes = [...shoes];
              result.data.forEach((a) => {
                copyShoes.push(a);
              });
              setShoes(copyShoes);
            })
            .catch(()=>{
              console.log('Failed to load')
            })
          }}>Show More</button>
        </>
        } />

        <Route path="/detail/:id" element={ <Detail shoes={shoes} /> } />

        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <div>Members</div> } />
          <Route path="location" element={ <div>Location</div> } />
        </Route>

        <Route path="/event" element={ <Event/> }>
          <Route path="one" element={ <div>첫 주문 시 50% 할인</div> } />
          <Route path="two" element={ <div>생일 기념 쿠폰</div> } />
        </Route>

        <Route path="*" element={<div>존재하지 않는 페이지입니다</div>} />

      </Routes>

    </div>
  );
}

//componetns
function ShoesCard(props) {
  return (
    props.shoes.map(function(a, i){
      let imageSource = `https://codingapple1.github.io/shop/shoes${i + 1}.jpg`
      let link = `/detail/${i}`
      return (
        <Col md={4} key={i}>
          <a href={link}>
            <img src={imageSource} width="80%"/>
          </a>
          <h4>{a.title}</h4>
          <p>{a.content}</p>
        </Col>
      )
    })
  )
}
// END of components

export default App;
