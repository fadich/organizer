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
            $item = $this->jsonEncode($item);
        }

        $form = $this->createForm('Royal\TodoBundle\Form\ItemType', new Item());
        $csrf = $this->getCsrfToken($form->getName());
        return $this->json([
            'items' => $items,
            'token' => $csrf,
        ]);
    }

    /**
     * Creates a new item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request)
    {
        // royal_todobundle_item[field_name]
        $item = new Item();
        $item
            ->setUserId(0)
            ->setCreatedAt(time())
            ->setUpdatedAt(time());

        $form = $this->createForm('Royal\TodoBundle\Form\ItemType', $item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($item);
            $em->flush();

            return $this->json([
                'item' => $this->jsonEncode($item),
            ]);
        }

        return $this->json([
            'item' => $this->jsonEncode($item),
            'errors' => $this->jsonEncode($form->getErrors()),
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
        return $this->json([
            'item' => $this->jsonEncode($item),
        ]);
    }

    /**
     * Displays a form to edit an existing item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Royal\TodoBundle\Entity\Item $item
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, Item $item)
    {
        $editForm = $this->createForm('Royal\TodoBundle\Form\ItemType', $item);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->json([
                'item' => $this->jsonEncode($item),
            ]);
        }

        return $this->json([
            'item' => $this->jsonEncode($item),
            'errors' => $this->jsonEncode($editForm->getErrors()),
        ]);
    }

    /**
     * Deletes a item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Royal\TodoBundle\Entity\Item $item
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function deleteAction(Request $request, Item $item)
    {
        $form = $this->createDeleteForm($item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $deleted = clone $item;
            $em = $this->getDoctrine()->getManager();
            $em->remove($item);
            $em->flush();

            return $this->json([
                'item' => $this->jsonEncode($deleted),
            ]);
        }

        $csrf = $this->getCsrfToken($form->getName());
        return $this->json([
            'item' => $this->jsonEncode($item),
            'errors' => $this->jsonEncode($form->getErrors()),
            'token' => $csrf,
        ]);
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
        $form = $this->createFormBuilder()->setAction(
            $this->generateUrl('item_delete', [
                'id' => $item->getId()
            ])
        );

        return $form->setMethod('DELETE')->getForm();
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManager
     */
    protected function csrfTokenManager()
    {
        /** @var \Symfony\Component\Security\Csrf\CsrfTokenManager $csrf */
        $csrf = $this->get("security.csrf.token_manager");
        return $csrf;
    }

    /**
     * @param string $tokenId
     *
     * @return string
     */
    protected function getCsrfToken(string $tokenId)
    {
        return $this->csrfTokenManager()->getToken($tokenId)->getValue();
    }

    /**
     * @param mixed $data
     *
     * @return mixed
     */
    protected function jsonEncode($data)
    {
        return json_decode($this->serializer->serialize($data, 'json'), true);
    }
}
