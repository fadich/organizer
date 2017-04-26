<?php

namespace Royal\TodoBundle\Controller;

use Royal\TodoBundle\Entity\Item;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * Item controller.
 *
 */
class ItemController extends Controller
{
    /**
     * @var \Symfony\Component\Serializer\Serializer
     */
    public $serializer;

    function __construct()
    {
        $encoders = [
            new XmlEncoder(),
            new JsonEncoder(),
        ];
        $normalizers = [
            new ObjectNormalizer(),
        ];

        $this->serializer = new Serializer($normalizers, $encoders);
    }

    /**
     * Lists all item entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $items = $em->getRepository('RoyalTodoBundle:Item')->findAll();
        foreach ($items as &$item) {
            $item = $this->serializer->serialize($item, 'json');
        }

        return $this->json([
            'items' => $items,
        ]);
    }

    /**
     * Creates a new item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request)
    {
        $item = new Item();
        $form = $this->createForm('Royal\TodoBundle\Form\ItemType', $item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($item);
            $em->flush();

            return $this->json([
                'item' => $this->serializer->serialize($item, 'json'),
            ]);
        }

        return $this->json([
            'item' => $this->serializer->serialize($item, 'json'),
            'errors' => $this->serializer->serialize($form->getErrors(), 'json'),
        ]);
    }

    /**
     * Finds and displays a item entity.
     *
     * @param \Royal\TodoBundle\Entity\Item $item
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction(Item $item)
    {
        $deleteForm = $this->createDeleteForm($item);

        return $this->render('item/show.html.twig', array(
            'item' => $item,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Royal\TodoBundle\Entity\Item $item
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, Item $item)
    {
        $deleteForm = $this->createDeleteForm($item);
        $editForm = $this->createForm('Royal\TodoBundle\Form\ItemType', $item);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('item_edit', array('id' => $item->getId()));
        }

        return $this->render('item/edit.html.twig', array(
            'item' => $item,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Royal\TodoBundle\Entity\Item $item
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request, Item $item)
    {
        $form = $this->createDeleteForm($item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($item);
            $em->flush();
        }

        return $this->redirectToRoute('item_index');
    }

    /**
     * Creates a form to delete a item entity.
     *
     * @param Item $item The item entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Item $item)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('item_delete', array('id' => $item->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
