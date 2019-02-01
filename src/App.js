import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "React simple CRUD",
      act: 0,
      index: 0,
      datas: []
    }
  }

  componentDidMount() {
    this.refs.nombre.focus();
    this.loadTable();
  }


  loadTable(){
    //port from react should be seted in api as CORS
    fetch('http://localhost:8080/api/clientes')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        datas: json
      })
    });
 }

  formSubmit = (e) => {
    e.preventDefault();
    console.log("try");

    let datas = this.state.datas;

    let newId = datas.length+1;

    let id = this.refs.id.value==""? newId: this.refs.id.value;
    let nombre = this.refs.nombre.value;
    let apellido = this.refs.apellido.value;
    let email = this.refs.email.value;

    if (this.state.act === 0) {
      let data = {
        id, nombre, apellido, email
      }
      //agrega al array
      datas.push(data);
    } else {
      let index = this.state.index;
      datas[index].id = id;
      datas[index].nombre = nombre;
      datas[index].apellido = apellido;
      datas[index].email = email;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.nombre.focus();
  }

  formRemove(i) {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });
    console.log(i);
  }

  formEdit(i) {
    let data = this.state.datas[i];
    this.refs.id.value = data.id;
    this.refs.nombre.value = data.nombre;
    this.refs.apellido.value = data.apellido;
    this.refs.email.value = data.email;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.nombre.focus();
  }



  deleteCliente(idCliente) {

    Swal.fire({
      title: 'Eliminación',
      text: "Está segur@ de que desea eliminar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {

        fetch('http://localhost:8080/api/clientes/' + idCliente, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })

        Swal.fire('Correcto', "se ha eliminado correctamente", "success");
      }
    })
  }


  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <div className="container">
          <h2>{this.state.title}</h2>

         
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Formulario</div>
            <div className="card-body">
              <h5 className="card-title">Cliente</h5>

              <form ref="myForm" className="myForm">
              <div className="form-group row">
                  <input type="text" ref="id" placeholder="your id" className="form-control" hidden></input>
                </div>
                <div className="form-group row">
                  <input type="text" ref="nombre" placeholder="your name" className="form-control"></input>
                </div>
                <div className="form-group row">
                  <input type="text" ref="apellido" placeholder="your lastname" className="form-control"></input>
                </div>
                <div className="form-group row">
                  <input type="text" ref="email" placeholder="your email" className="form-control"></input>
                </div>
                <button onClick={this.formSubmit} className="btn btn-primary">Guardar <img src={logo}></img></button>
              </form>

            </div>
          </div>



          <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Eliminar</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
            
                {datas.map((data,i) => 
                  <tr key={i}>

                    <td>
                      {data.id}
                    </td>

                    <td>
                      {data.nombre}
                    </td>

                    <td>
                      {data.apellido}
                    </td>

                    <td>
                      {data.email}
                    </td>

                    <td>
                      <button className="btn btn-danger"  onClick={() => this.formRemove(i)}>Eliminar</button>
                    </td>

                    <td>
                      <button className="btn btn-warning"  onClick={() => this.formEdit(i)}>Editar</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            
         

        </div>
      </div>
    );
  }
}

export default App;
