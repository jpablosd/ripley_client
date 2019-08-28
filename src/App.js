import React,{Component,createClass,PropTypes} from 'react';




class App extends Component{
  constructor(props){
    super(props);
    this.state = { apiResponse : "" };
  }

  handleClick(product) {
    console.log('this is:', product);


    



  }

  callAPI(){
    //fetch("http://localhost:9000/testAPI")
    
    fetch("http://localhost:9000/getProducts")
    .then(res => {
      return res.json()  
    })
    .then(res => this.setState({ apiResponse : JSON.parse(res) }))
    .catch(err => err);
  }

  componentDidMount(){
    this.callAPI();
  }




  render(){
    let products = "";

    if(this.state.apiResponse.length > 0){

      //console.log(this.state)
      products = this.state.apiResponse.map( (product) => {
        //console.log(product)

        return( 
          <div className="col-sm-12 col-lg-3" key={product.uniqueID}>
            <div className="card shadow p-3 mb-5 bg-white rounded">
              <img className="card-img-top" alt="..." src={product.fullImage}></img>
              <div className="card-body">
                <h5 className="card-title">{ product.name }</h5>

                <p className="card-text">Precio Normal: <strike>{product.prices.formattedListPrice}</strike></p>
                <p className="card-text">Descuento: {product.prices.formattedDiscount}</p>
                <p className="card-text">Precio Final: {product.prices.formattedOfferPrice}</p>

                <button type="button" className="btn btn-success" data-toggle="modal" data-target=".bd-example-modal-xl" onClick={() => this.handleClick(product)} >Ver Producto</button>



                <div className="modal fade bd-example-modal-xl"  role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="row">
                          <div className="col-12 align-middle text-center">
                            <h4>{product.name}</h4>
                          </div>
                          <div className="col-12 text-center">
                            <img src={product.fullImage} className="img-fluid" alt="Responsive image"/>
                          </div>

                          <div className="col-12">
                            <p className="card-text">Precio Normal: <strike>{product.prices.formattedListPrice}</strike></p>
                            <p className="card-text">Descuento: {product.prices.formattedDiscount}</p>
                            <p className="card-text">Precio Final: {product.prices.formattedOfferPrice}</p>
                          </div>

                          <div className="col-12">
                            <p>{ product.attributes.name}</p>
                          </div>

                          <div className="col-12">
                            <button type="button" className="btn btn-primary"  >Comprar</button>
                          </div>


                          

                      </div>
                    </div>
                  </div>
                </div>



              </div>
            </div>

          </div>

        )
      });
    
    }

    return( 
      <div>{products}</div>
    );
  }

}





/*
function App2() {
  return (
      <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          ...
        </div>
      </div>
    </div>
  );
}
*/

export default App;
