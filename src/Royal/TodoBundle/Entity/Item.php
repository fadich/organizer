<?php

namespace Royal\TodoBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Item
 */
class Item
{
    public const STATUS_ACTIVE = 4;
    public const STATUS_POSTPONED = 3;
    public const STATUS_DONE = 2;
    public const STATUS_NOT_ACTIVE = 1;
    public const STATUS_DELETED = 0;

    /**
     * @var int
     */
    protected $id;

    /**
     * @Assert\NotNull()
     * @Assert\Length(
     *      min = 0,
     *      max = 255,
     *      minMessage = "Title field cannot be shorter than {{ limit }}",
     *      maxMessage = "Title field cannot be longer than {{ limit }} characters"
     * )
     */
    protected $title;

    /**
     * @Assert\NotNull()
     */
    protected $content;

    /**
     * @Assert\NotNull()
     * @Assert\Range(
     *      min = 0,
     *      max = 4,
     *      minMessage = "Status field cannot be less than {{ limit }}",
     *      maxMessage = "Status field cannot be greater than {{ limit }}"
     * )
     */
    protected $status = self::STATUS_ACTIVE;

    /**
     * @Assert\NotNull()
     *
     * @Assert\NotNull()
     * @Assert\Range(
     *      min = 0,
     *      minMessage = "User ID cannot be negative",
     * )
     */
    protected $userId = 0;

    /**
     * @Assert\NotNull()
     * @Assert\Range(
     *      min = 0,
     *      minMessage = "Created time cannot be negative",
     * )
     */
    protected $createdAt;

    /**
     * @Assert\NotNull()
     * @Assert\Range(
     *      min = 0,
     *      minMessage = "Updated time cannot be negative",
     * )
     */
    protected $updatedAt;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Item
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return Item
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Item
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return Item
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set createdAt
     *
     * @param integer $createdAt
     *
     * @return Item
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return int
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param integer $updatedAt
     *
     * @return Item
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return int
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
}

