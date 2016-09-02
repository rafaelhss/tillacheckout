package tillacheckout.venda;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tillacheckout.venda.comprovante.Comprovante;
import tillacheckout.venda.endereco.Endereco;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;
import java.util.List;

/**
 * Created by rafa on 27/08/2016.
 */
@Service
@Getter
@Setter
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;


    public List<Venda> changeStatus(Long codigo, boolean forward) {
        Venda v = vendaRepository.findOne(codigo);
        if (v != null) {
            if (forward) {
                if (v.getVendaStatus() == VendaStatus.PEDIDO_RECEBIDO) {
                    v.setVendaStatus(VendaStatus.PAGAMENTO_APROVADO);
                } else if(v.getVendaStatus() == VendaStatus.PAGAMENTO_APROVADO) {
                    v.setVendaStatus(VendaStatus.ENVIADO_CORREIOS);
                } else {
                    v.setVendaStatus(VendaStatus.TESTE_IGNORAR);
                }
            }
            else {
                if (v.getVendaStatus() == VendaStatus.ENVIADO_CORREIOS) {
                    v.setVendaStatus(VendaStatus.PAGAMENTO_APROVADO);
                } else {
                    v.setVendaStatus(VendaStatus.PEDIDO_RECEBIDO);
                }
            }
            vendaRepository.save(v);
            return vendaRepository.findByContato(v.getContato());
        }
        return null;
    }



    @Transactional
    public Venda saveVenda(byte[] bytes, String whatsapp, String facebook, String produtos, Endereco endereco, String email, String nome) {

        Comprovante comprovante = new Comprovante();
        comprovante.setFile(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(bytes)));


        Venda venda = new Venda();
        venda.setComprovante(comprovante);
        venda.setEndereco(endereco);
        venda.setFacebook(facebook);
        venda.setWhatsapp(whatsapp);
        venda.setProdutos(produtos);
        venda.setData(new Date());
        venda.setContato(whatsapp.trim().isEmpty() ? facebook : whatsapp);

        venda.setNome(nome);
        venda.setEmail(email);

        venda.setVendaStatus(VendaStatus.PEDIDO_RECEBIDO);

     //   comprovanteRepository.save(comprovante);
       return vendaRepository.save(venda);

    }

}
